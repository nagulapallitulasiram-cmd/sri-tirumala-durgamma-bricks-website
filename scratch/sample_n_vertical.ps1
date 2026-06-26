Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")
Write-Output "=== Column X=390 ==="
for ($y = 330; $y -le 720; $y += 10) {
    $c = $img.GetPixel(390, $y)
    Write-Output "Y=$y : R=$($c.R)"
}
Write-Output "=== Column X=530 ==="
for ($y = 330; $y -le 720; $y += 10) {
    $c = $img.GetPixel(530, $y)
    Write-Output "Y=$y : R=$($c.R)"
}
$img.Dispose()
