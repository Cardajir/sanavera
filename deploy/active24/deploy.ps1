<#
.SYNOPSIS
  Builds the site and uploads dist/ to the Active24 web root over FTPS.

.DESCRIPTION
  Run from the repository root:

      powershell -ExecutionPolicy Bypass -File deploy/active24/deploy.ps1

  The FTP password is asked for at run time and never written to disk in
  the clear: it goes into a temporary curl config file that is removed as
  soon as the upload ends. Use -ListOnly to see the account's root folders
  first, when unsure where the web root is.

  Why not the GitHub workflow: the hosting's FTP server drops connections
  from GitHub Actions right after PASS (a Czech address gets a normal 530
  on a wrong password, the runner gets the socket closed), so uploads have
  to come from here. The workflow stays for the day that changes.

.PARAMETER FtpHost
  FTP host. The TLS certificate is issued to the provider's shared name, not
  to this host, so curl is told not to verify it - the same trust FileZilla
  asks for with its "trust this certificate" prompt.
#>
[CmdletBinding()]
param(
  [string] $FtpHost = "sanavera.cz",
  [string] $User = "info.sanavera.cz",
  # The account's tree is /<domain>/web/, not the usual /www/.
  [string] $RemoteDir = "/sanavera.cz/web/",
  [switch] $ListOnly,
  [switch] $SkipBuild
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $root

$curl = Get-Command curl.exe -ErrorAction SilentlyContinue
# ASCII only in this file: PowerShell 5.1 reads a BOM-less script as ANSI and
# turns a typographic dash into a quote character.
if (-not $curl) { throw "curl.exe not found - it ships with Windows 10 1803+." }

$secure = Read-Host -Prompt "FTP password for $User" -AsSecureString
$password = [System.Net.NetworkCredential]::new("", $secure).Password
if (-not $password) { throw "No password given." }

# curl reads user:password from a config file so neither shows up in the
# process list. The file lives in %TEMP% only for the length of the run.
$config = New-TemporaryFile
try {
  $lines = @(
    "user = `"$User`:$password`"",
    "ssl-reqd",
    "insecure",
    "silent",
    "show-error",
    "ftp-create-dirs"
  )

  if ($ListOnly) {
    $lines += "url = `"ftp://$FtpHost/`""
    # No BOM: curl would read it as part of the first option's name.
    [System.IO.File]::WriteAllLines($config, $lines, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Root of the account:"
    & $curl.Source -K $config
    exit $LASTEXITCODE
  }

  if (-not $SkipBuild) {
    Write-Host "Building..."
    npm run build:active24
    if ($LASTEXITCODE -ne 0) { throw "Build failed." }
  }

  $dist = Join-Path $root "dist"
  $files = Get-ChildItem -Path $dist -Recurse -File -Force
  Write-Host ("Uploading {0} files to {1}{2} ..." -f $files.Count, $FtpHost, $RemoteDir)

  $remoteBase = $RemoteDir.TrimEnd("/")
  # The hosting's placeholder would otherwise sit next to index.html for
  # ever. The asterisk tells curl to carry on when the file is already gone.
  $lines += "quote = `"*DELE $remoteBase/index.php`""
  foreach ($file in $files) {
    $relative = $file.FullName.Substring($dist.Length + 1).Replace("\", "/")
    # Forward slashes: inside a quoted curl config value a backslash escapes
    # the next character, so a Windows path would lose all its separators.
    $local = $file.FullName.Replace("\", "/")
    $lines += "upload-file = `"$local`""
    $lines += "url = `"ftp://$FtpHost$remoteBase/$relative`""
  }
  [System.IO.File]::WriteAllLines($config, $lines, [System.Text.UTF8Encoding]::new($false))

  # One curl process for every file: the control connection is reused, so
  # the TLS handshake happens once rather than per file.
  & $curl.Source -K $config
  if ($LASTEXITCODE -ne 0) { throw "Upload failed (curl exit $LASTEXITCODE)." }

  Write-Host "Done. Check https://$FtpHost/"
}
finally {
  Remove-Item $config -Force -ErrorAction SilentlyContinue
  $password = $null
}
