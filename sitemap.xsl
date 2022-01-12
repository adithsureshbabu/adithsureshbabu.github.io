<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="utf-8" indent="yes" />
	<xsl:template match="/">
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta http-equiv="content-type" content="text/html; charset=utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<base href="https://adithsuresh.github.io/"></base>
				<title>Sitemap for adithsuresh.github.io</title>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<style type="text/css">
					body {
						font-family:"Lucida Grande","Lucida Sans Unicode",Tahoma,Verdana,sans-serif;
						font-size:18px;
					}
					table {
						width:100%;
					}
					td {
						font-size:16px;
					}
					th {
						text-align:left;
						padding-right:30px;
						font-size:16px;
						background-color:#CFEBF7;
					}
					tr._ {
						background-color:#f5f5f5;
					}
					a {
						color:#33aadd;
					}
				</style>
			</head>
			<body>
				<div id="content">
					<table cellpadding="5">
						<tr style="border-bottom:1px black solid;">
							<th>URL</th>
							<th>Priority</th>
							<th>Change Frequency</th>
							<th>LastChange (GMT)</th>
						</tr>
						<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'" />
						<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
						<xsl:for-each select="sitemap:urlset/sitemap:url">
							<tr>
								<xsl:if test="position() mod 2 != 1">
									<xsl:attribute name="class">_</xsl:attribute>
								</xsl:if>
								<td>
									<xsl:variable name="loc">
										<xsl:value-of select="sitemap:loc" />
									</xsl:variable>
									<a href="{$loc}">
										<xsl:value-of select="sitemap:loc" />
									</a>
								</td>
								<td>
									<xsl:value-of select="concat(sitemap:priority*100,'%')" />
								</td>
								<td>
									<xsl:value-of select="concat(translate(substring(sitemap:changefreq, 1, 1),concat($lower, $upper),concat($upper, $lower)),substring(sitemap:changefreq, 2))" />
								</td>
								<td>
									<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))" />
								</td>
							</tr>
						</xsl:for-each>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>