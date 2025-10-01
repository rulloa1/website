# Fix remaining blue button classes in product pages
Write-Host "Fixing blue button classes to match modern theme..." -ForegroundColor Cyan

$shopDir = "C:\xampp\htdocs\www.logshop.cc\shop"
$htmlFiles = Get-ChildItem -Path $shopDir -Recurse -Filter "*.html"
$fixedCount = 0

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Gray
    
    try {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
        $originalContent = $content
        
        # Fix the Orders button blue classes - these should be handled by modern-theme.css
        # but let's ensure consistency by keeping the classes but letting CSS override
        $wasModified = $false
        
        # The modern-theme.css already handles styling via a[href*="orders"] selector
        # so we don't need to change the classes, just verify they're present
        
        if ($content -match 'bg-blue-600.*hover:bg-blue-700.*Orders') {
            Write-Host "  Found Orders button with blue classes (CSS will override)" -ForegroundColor Blue
            $fixedCount++
        }
        
        # Check for any other problematic old color references
        if ($content -match 'bg-yellow|#f1c40f|#3498db') {
            Write-Host "  Found other old color references" -ForegroundColor Yellow
            $content = $content -replace '#f1c40f', '#DC2625'
            $content = $content -replace '#3498db', '#DC2625'
            $wasModified = $true
        }
        
        if ($wasModified) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -ErrorAction Stop
            Write-Host "  Updated old color references" -ForegroundColor Green
        }
        
    } catch {
        Write-Host "  Error processing file: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nCompleted! Found $fixedCount files with Orders buttons." -ForegroundColor Green
Write-Host "The modern-theme.css will handle the styling via CSS selectors." -ForegroundColor Cyan