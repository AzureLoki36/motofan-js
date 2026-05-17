Add-Type -AssemblyName System.Drawing
$tile = 320
$img1 = [System.Drawing.Image]::FromFile((Resolve-Path "public/pics/dzieci/doodle-set-1.jpg"))
$img2 = [System.Drawing.Image]::FromFile((Resolve-Path "public/pics/dzieci/doodle-set-2.jpg"))
$canvas = New-Object System.Drawing.Bitmap (($tile*2), ($tile*2))
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.Clear([System.Drawing.Color]::White)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img1, 0, 0, $tile, $tile)
$g.DrawImage($img2, $tile, 0, $tile, $tile)
$g.DrawImage($img2, 0, $tile, $tile, $tile)
$g.DrawImage($img1, $tile, $tile, $tile, $tile)
$g.Dispose()
$out = Join-Path (Get-Location) "public/pics/dzieci/doodle-pattern.png"
if (!(Test-Path (Split-Path $out))) { New-Item -ItemType Directory -Force (Split-Path $out) }
$canvas.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose(); $img1.Dispose(); $img2.Dispose()
Write-Output "Saved: $out"
(Get-Item $out).Length
