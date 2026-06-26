Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")
# Bounding box coordinates
$x = 370
$y = 390
$width = 210
$height = 250

$rect = New-Object System.Drawing.Rectangle($x, $y, $width, $height)
$cropped = $img.Clone($rect, $img.PixelFormat)
$cropped.Save("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_cropped_correct.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Also let's resize it to 128x128 or similar square aspect ratio.
# Since the original is 210x250, let's resize it to 128x128 or preserve aspect ratio inside 128x128.
# Actually, the Three.js front texture aspect ratio is 768x256 (3:1).
# We can resize this to 128x128 or we can keep it as is and draw it with its correct aspect ratio on the canvas!
# If we resize it to 128x128, it will be slightly squashed horizontally, but the original N in the photo is also slightly stretched vertically due to perspective.
# Let's save the cropped image first.

$cropped.Dispose()
$img.Dispose()
Write-Output "Saved correct cropped logo to scratch/logo_cropped_correct.png"
