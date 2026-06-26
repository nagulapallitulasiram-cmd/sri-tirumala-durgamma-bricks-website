Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\site.zip"
$appJsPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\app.js"
$htmlPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\index.html"
$cssPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\styles.css"

# Open the zip in Update mode
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Update)

# 1. Update app.js
$appEntry = $zip.GetEntry("app.js")
if ($appEntry) {
    $appEntry.Delete()
    Write-Output "Deleted old app.js from site.zip"
}
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $appJsPath, "app.js")
Write-Output "Added updated app.js to site.zip"

# 2. Update index.html
$htmlEntry = $zip.GetEntry("index.html")
if ($htmlEntry) {
    $htmlEntry.Delete()
    Write-Output "Deleted old index.html from site.zip"
}
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $htmlPath, "index.html")
Write-Output "Added updated index.html to site.zip"

# 3. Update styles.css
$cssEntry = $zip.GetEntry("styles.css")
if ($cssEntry) {
    $cssEntry.Delete()
    Write-Output "Deleted old styles.css from site.zip"
}
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $cssPath, "styles.css")
Write-Output "Added updated styles.css to site.zip"

# Close/save the zip
$zip.Dispose()

Write-Output "site.zip successfully updated!"
