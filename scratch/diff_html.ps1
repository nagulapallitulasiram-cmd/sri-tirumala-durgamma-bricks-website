Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\site.zip"
$htmlPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\index.html"

$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entry = $zip.GetEntry("index.html")
$tempFile = [System.IO.Path]::GetTempFileName()
[System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $tempFile, $true)
$zip.Dispose()

$diff = Compare-Object (Get-Content $tempFile) (Get-Content $htmlPath)
Write-Output "Number of differing lines: $($diff.Length)"
$diff | Select-Object -First 30 | Format-Table -AutoSize

Remove-Item $tempFile -Force
