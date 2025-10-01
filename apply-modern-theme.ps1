# Apply Modern Theme to All Product Pages
Write-Host "Applying modern theme to all product pages..." -ForegroundColor Cyan

$shopDir = "C:\xampp\htdocs\www.logshop.cc\shop"
$htmlFiles = Get-ChildItem -Path $shopDir -Recurse -Filter "*.html"
$processedCount = 0

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Gray
    
    try {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
        
        if ($content -notmatch "modern-theme\.css") {
            if ($content -match "main-2\.css") {
                $relativePath = "../../home/css/modern-theme.css"
                $newThemeLink = "`n    <link rel=`"stylesheet`" href=`"$relativePath`">"
                $newContent = $content -replace "(main-2\.css`">)", "`$1$newThemeLink"
                
                Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -ErrorAction Stop
                Write-Host "  Added modern theme" -ForegroundColor Green
                $processedCount++
            } else {
                Write-Host "  No main-2.css found" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  Already has modern theme" -ForegroundColor Blue
        }
    } catch {
        Write-Host "  Error processing file: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nCompleted! Processed $processedCount files." -ForegroundColor Green
