# Word COM Debugging Script

Write-Output "Initializing Word.Application COM object..."
$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
    Write-Output "Word COM object version: $($word.Version)"
    
    Write-Output "Creating new document..."
    $doc = $word.Documents.Add()
    
    Write-Output "Configuring PageSetup..."
    $doc.PageSetup.TopMargin = 72
    $doc.PageSetup.BottomMargin = 72
    $doc.PageSetup.LeftMargin = 72
    $doc.PageSetup.RightMargin = 72
    $doc.PageSetup.DifferentFirstPageHeaderFooter = $true
    Write-Output "PageSetup configured."
    
    $colorNavy = 6108698   # #1A365D (Deep Navy)
    $colorSlate = 6837578  # #4A5568 (Slate Gray)
    $colorGold = 3051460   # #C48F2E (Accent Gold)
    $colorCharcoal = 4732717 # #2D3748 (Body Text)
    $colorLightBg = 16579319 # #F7FAFC (Light Background)
    
    function Add-Paragraph ($text, $size = 11, $bold = $false, $color = $colorCharcoal, $spaceAfter = 6, $alignment = 0) {
        $p = $doc.Paragraphs.Add()
        $p.Range.Text = $text
        $p.Range.Font.Name = "Calibri"
        $p.Range.Font.Size = $size
        $p.Range.Font.Bold = $bold
        $p.Range.Font.Color = $color
        $p.Format.SpaceAfter = $spaceAfter
        $p.Format.Alignment = $alignment
        $p.Range.InsertParagraphAfter()
        return $p
    }
    
    Write-Output "Adding Cover Page title..."
    $p1 = Add-Paragraph "BUSINESS REQUIREMENT DOCUMENT" 26 $true $colorNavy 12 1 | Out-Null
    
    Write-Output "Adding Cover Page subtitle..."
    $p2 = Add-Paragraph "Development of a Premium Website for Sri Tirumala Durgamma Bricks" 16 $false $colorSlate 24 1 | Out-Null
    
    Write-Output "Inserting Page Break..."
    $range = $doc.Paragraphs.Last.Range
    $range.Collapse(0) # wdCollapseEnd = 0
    $range.InsertBreak(7) # wdPageBreak = 7
    Write-Output "Page Break inserted."
    
    Write-Output "Setting up Header and Footer..."
    $section = $doc.Sections.Item(1)
    
    Write-Output "Accessing Primary Header..."
    $primaryHeader = $section.Headers.Item(1) # wdHeaderFooterPrimary = 1
    $primaryHeader.Range.Text = "Sri Tirumala Durgamma Bricks | BRD Test"
    $primaryHeader.Range.Font.Name = "Calibri"
    $primaryHeader.Range.Font.Size = 9
    $primaryHeader.Range.Font.Color = $colorSlate
    $primaryHeader.Range.ParagraphFormat.Alignment = 2
    Write-Output "Header text set."
    
    Write-Output "Accessing Primary Footer..."
    $primaryFooter = $section.Footers.Item(1) # wdHeaderFooterPrimary = 1
    $primaryFooter.Range.Text = "Confidential`t`tPage "
    $primaryFooter.Range.Font.Name = "Calibri"
    $primaryFooter.Range.Font.Size = 9
    $primaryFooter.Range.Font.Color = $colorSlate
    Write-Output "Footer text set."
    
    Write-Output "Adding Page field in footer..."
    $rangePage = $primaryFooter.Range
    $rangePage.Collapse(0)
    $doc.Fields.Add($rangePage, 33) | Out-Null # wdFieldPage = 33
    Write-Output "Page field added."
    
    Write-Output "Adding ' of ' text in footer..."
    $rangeOf = $primaryFooter.Range
    $rangeOf.Collapse(0)
    $rangeOf.Text = " of "
    Write-Output "' of ' text added."
    
    Write-Output "Adding NumPages field in footer..."
    $rangeNum = $primaryFooter.Range
    $rangeNum.Collapse(0)
    $doc.Fields.Add($rangeNum, 26) | Out-Null # wdFieldNumPages = 26
    Write-Output "NumPages field added."
    
    Write-Output "Adding page 2 content..."
    $p3 = Add-Paragraph "1. Project Introduction" 18 $true $colorNavy 12 0 | Out-Null
    $p4 = Add-Paragraph "This is a test of the Microsoft Word COM generation script." 11 $false $colorCharcoal 6 0 | Out-Null
    Write-Output "Page 2 content added."
    
    Write-Output "Creating table..."
    $tableRange = $doc.Paragraphs.Last.Range
    $tableRange.Collapse(0)
    $table = $doc.Tables.Add($tableRange, 3, 3)
    $table.Borders.Enable = $true
    Write-Output "Table created. Populating and styling table cells..."
    
    for ($r = 1; $r -le 3; $r++) {
        for ($c = 1; $c -le 3; $c++) {
            $cell = $table.Cell($r, $c)
            if ($r -eq 1) {
                $cell.Range.Text = "Header $c"
                $cell.Range.Font.Bold = $true
                $cell.Range.Font.Color = 16777215 # White
                $cell.Shading.BackgroundPatternColor = $colorNavy
            } else {
                $cell.Range.Text = "Row $r Col $c"
                $cell.Range.Font.Color = $colorCharcoal
                if ($r % 2 -eq 0) {
                    $cell.Shading.BackgroundPatternColor = $colorLightBg
                }
            }
            $cell.Range.Font.Name = "Calibri"
            $cell.Range.Font.Size = 10
        }
    }
    Write-Output "Table populated."
    
    Write-Output "Saving document..."
    $docPath = Join-Path $pwd "scratch\test_brd.docx"
    $pdfPath = Join-Path $pwd "scratch\test_brd.pdf"
    
    Write-Output "Saving DOCX to $docPath..."
    $doc.SaveAs($docPath)
    Write-Output "DOCX saved."
    
    Write-Output "Saving PDF to $pdfPath..."
    $doc.SaveAs($pdfPath, 17)
    Write-Output "PDF saved."
    
    Write-Output "Closing document..."
    $doc.Close()
    Write-Output "Test document completed successfully!"
} catch {
    Write-Output "ERROR: $_"
} finally {
    Write-Output "Quitting Word..."
    $word.Quit()
    Write-Output "Word quitted."
}
