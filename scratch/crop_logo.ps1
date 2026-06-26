Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")
$rect = New-Object System.Drawing.Rectangle(339, 491, 351, 327)
$cropped = $img.Clone($rect, $img.PixelFormat)
$cropped.Save("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_cropped.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$img.Dispose()
Write-Output "Saved cropped logo to scratch/logo_cropped.png"
