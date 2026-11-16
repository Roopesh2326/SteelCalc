# Measured browser results (Firefox headless, exact viewport widths)

Source: patched SteelCalc build (deployment fixes + local images applied).
Contrast column is an approximation (text color vs nearest solid background; skips gradients/images) - treat as a lead to verify, not a verdict.

| page | width | h-scroll | text blocks <12px | tap targets <44px | possible low contrast | nav visible |
|---|---|---|---|---|---|---|
| home | 1440 | no | 86 | 29 | 5 | yes |
| home | 768 | no | 86 | 24 | 5 | NO |
| home | 390 | no | 84 | 23 | 5 | NO |
| calculators | 1440 | no | 88 | 24 | 17 | yes |
| calculators | 768 | no | 88 | 19 | 13 | NO |
| calculators | 390 | no | 88 | 19 | 13 | NO |
| steel-weight | 1440 | no | 58 | 15 | 2 | yes |
| steel-weight | 768 | no | 58 | 15 | 2 | yes |
| steel-weight | 390 | no | 58 | 13 | 2 | NO |
| concrete | 1440 | no | 70 | 15 | 2 | yes |
| concrete | 768 | no | 70 | 15 | 2 | yes |
| concrete | 390 | no | 70 | 13 | 2 | NO |
| bbs | 1440 | no | 45 | 24 | 17 | yes |
| bbs | 768 | no | 45 | 24 | 17 | yes |
| bbs | 390 | no | 45 | 21 | 14 | NO |
| guides | 1440 | no | 16 | 8 | 12 | yes |
| guides | 768 | no | 16 | 8 | 12 | yes |
| guides | 390 | no | 16 | 4 | 8 | NO |
| workbench | 1440 | no | 47 | 26 | 33 | yes |
| workbench | 768 | no | 47 | 23 | 30 | NO |
| workbench | 390 | no | 47 | 23 | 30 | NO |
| unit-converter | 1440 | no | 16 | 7 | 8 | yes |
| unit-converter | 768 | no | 16 | 7 | 8 | yes |
| unit-converter | 390 | no | 16 | 4 | 5 | NO |
| 404 | 1440 | no | 7 | 4 | 5 | NO |
| 404 | 768 | no | 7 | 4 | 5 | NO |
| 404 | 390 | no | 7 | 4 | 5 | NO |
