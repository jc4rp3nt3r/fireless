FireLess
========

Firebug Extension: support for Less CSS

The purpose of this extension is to display the correct file name and line number for CSS rules when using the {less} css framework.  The file path and line number in the Style Side Panel of firebug with relect the server side file name & line number. Clicking on the link will continue to take you to the CSS tab, inspecting the combine CSS file.


Background Info:
----------------
At its simplest level, [{less} css](http://www.lesscss.org/) offers server side bundling of files (many CSS files into 1) to limit HTTP requests for more responsive online applications.

This causes a serious headache for developers when using firebug, as it is reporting the file name and line number of the bundled file. This information is accurate from the client side perspective, but it makes development difficult, due to the fact that the actual css rule could be in one of many files on the server and the line numbers are often inaccurate.


Notes:
------
* 	As of version 0.5, this has only been tested against dotLess, the .Net port of the less CSS framework.   
	http://www.dotlesscss.org/

*	Any feature request for other ports, or known issues should be directed to the github issue page:  
	https://github.com/jc4rp3nt3r/fireless/issues

*	See http://code.google.com/p/fbug/issues/detail?id=5961

*	This plugin reads the debug output of dotLess in order to print the original line number and file name during website development.  
	Example Web.config Entry for dotLess: <dotless minifyCss="false" debug="true" cache="false" web="false" importAllFilesAsLess="true" />