Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\site.zip"
$cssPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\styles.css"

$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entry = $zip.GetEntry("styles.css")
if ($entry) {
    $tempFile = [System.IO.Path]::GetTempFileName()
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $tempFile, $true)
    
    $localHash = (Get-FileHash -Path $cssPath -Algorithm SHA256).Hash
    $zipHash = (Get-FileHash -Path $tempFile -Algorithm SHA256).Hash
    
    if ($localHash -eq $zipHash) {
        Write-Output "styles.css matches exactly!"
    } else {
        Write-Output "styles.css differs! Local hash: $localHash, Zip hash: $zipHash"
    }
    Remove-Item $tempFile -Force
} else {
    Write-Output "styles.css not found in site.zip!"
}
$zip.Dispose()
