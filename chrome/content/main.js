/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "fireless/lessModule",
],
function(FBTrace, LessModule) {

// ********************************************************************************************* //
// The application/extension object

var theExtension =
{
    initialize: function()
    {
        if (FBTrace.DBG_FIRELESS)
            FBTrace.sysout("fireless; FireLess extension initialize");

        // Registration of Firebug panels and modules is made within appropriate files,
        // but it could be also done here.

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_FIRELESS)
            FBTrace.sysout("fireless; FireLess extension shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterModule(Firebug.LessModule);
        Firebug.unregisterStylesheet("chrome://fireless/skin/fireless.css");
        Firebug.unregisterStringBundle("chrome://fireless/locale/fireless.properties");

        // TODO: Extension shutdown
    }
}

// ********************************************************************************************* //

return theExtension;

// ********************************************************************************************* //
});
