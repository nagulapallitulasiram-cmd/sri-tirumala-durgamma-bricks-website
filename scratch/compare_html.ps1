Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\site.zip"
$htmlPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\index.html"

$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entry = $zip.GetEntry("index.html")
if ($entry) {
    $tempFile = [System.IO.Path]::GetTempFileName()
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $tempFile, $true)
    
    $localHash = (Get-FileHash -Path $htmlPath -Algorithm SHA256).Hash
    $zipHash = (Get-FileHash -Path $tempFile -Algorithm SHA256).Hash
    
    if ($localHash -eq $zipHash) {
        Write-Output "index.html matches exactly!"
    } else {
        Write-Output "index.html differs! Local hash: $localHash, Zip hash: $zipHash"
    }
    Remove-Item $tempFile -Force
} else {
    Write-Output "index.html not found in site.zip!"
}
$zip.Dispose()
