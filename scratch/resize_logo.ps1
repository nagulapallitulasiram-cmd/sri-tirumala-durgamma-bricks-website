Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_cropped.png")
$dest = New-Object System.Drawing.Bitmap(128, 128)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, 0, 0, 128, 128)

$dest.Save("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_resized.png", [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$dest.Dispose()
$src.Dispose()

$size = (Get-Item "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_resized.png").Length
Write-Output "Resized logo saved to scratch/logo_resized.png (size: $size bytes)"
