/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/css/stylePanel",
],
function(Obj, FBTrace, CSSStylePanel) {

// ********************************************************************************************* //
// Custom Module Implementation

Firebug.LessModule = Obj.extend(Firebug.Module,
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function(owner)
    {
        Firebug.Module.initialize.apply(this, arguments);

        // TODO: Module initialization (there is one module instance per browser window)

        if (FBTrace.DBG_FIRELESS)
            FBTrace.sysout("fireless; LessModule.initialize");
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        if (FBTrace.DBG_FIRELESS)
            FBTrace.sysout("fireless; LessModule.shutdown");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // CSSStylePanel Patch

    onCreatePanel: function(context, panel, panelType)
    {
        // Monkey patch the Style side panel
        if (panel instanceof CSSStylePanel)
        {
            // Sniff the document for file extensions
            // if no .less files, set a flag to avoid other work
            var bLessDetected = false;

            // loop through all stylesheets
            var arrStyleSheets = context.window.document.styleSheets;
            for (var i = 0; i < arrStyleSheets.length; i++) {
                if (arrStyleSheets[i].href.indexOf('.less') !== -1) {
                    bLessDetected = true;
                    break;
                }
            }

            // if we have a less file
            if (bLessDetected)
            {
                this.styleGetSourceLink = panel.getSourceLink;
                panel.getSourceLink = this.getSourceLink;
            }
        }
    },

    getSourceLink: function(target, rule)
    {
        // get the normal sourceLink from firebug (Props: href, instance, line, type, object, col)
        var oSourceLink = Firebug.LessModule.styleGetSourceLink.apply(this, arguments);
    
        // if this is a less file (there could be a mix in a site)
        if (oSourceLink.href.indexOf('.less') !== -1) 
        {                    
            // a counter for the current line index
            var iLineIndex = oSourceLink.line-1;
            // handle to the css doc, type = array of text strings per line
            var arrCss = this.context.sourceCache.load(oSourceLink.href);
            // dotLess format: /* /path/css-file.less:L123 */ 
            var regEx = /\/\* ([^:]*):L(\d*) \*\//;
            
            // prevent index out of bounds and stop looking after 5 lines
            while (iLineIndex >= 0 && oSourceLink.line - iLineIndex < 5) 
            {
                if (regEx.test(arrCss[iLineIndex])) 
                {
                    // update the file and line numbers for both less and Sass style comments
                    var arrMatch = arrCss[iLineIndex].match(regEx);                    
                    oSourceLink.href = arrMatch[1];
                    oSourceLink.line = arrMatch[2];
                    break;   
                }
                iLineIndex -= 1;
            }
        }

        return oSourceLink;
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerModule(Firebug.LessModule);

return Firebug.LessModule;

// ********************************************************************************************* //
});
