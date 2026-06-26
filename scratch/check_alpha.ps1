Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")
$hasAlpha = $false
for ($x = 0; $x -lt $img.Width; $x += 10) {
    for ($y = 0; $y -lt $img.Height; $y += 10) {
        if ($img.GetPixel($x, $y).A -lt 255) {
            $hasAlpha = $true
            break
        }
    }
    if ($hasAlpha) { break }
}
$img.Dispose()
Write-Output "Has Alpha: $hasAlpha"
