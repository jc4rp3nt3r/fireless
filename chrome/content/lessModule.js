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
        // Monkey patch the Style side panel.
        if (panel instanceof CSSStylePanel)
        {
            this.styleGetSourceLink = panel.getSourceLink;
            panel.getSourceLink = this.getSourceLink;
        }
    },

    getSourceLink: function(target, rule)
    {
        if (FBTrace.DBG_FIRELESS)
            FBTrace.sysout("fireless; LessModule.getSourceLink");

        Firebug.LessModule.styleGetSourceLink.apply(this, arguments);
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerModule(Firebug.LessModule);

return Firebug.LessModule;

// ********************************************************************************************* //
});
