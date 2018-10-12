//https://github.com/Microsoft/vss-web-extension-sdk

VSS.init({
    explicitNotifyLoaded: true,
    usePlatformStyles: true
});

VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {

    //https://docs.microsoft.com/en-us/vsts/extend/develop/styles-from-widget-sdk?view=vsts
    WidgetHelpers.IncludeWidgetStyles();
    WidgetHelpers.IncludeWidgetConfigurationStyles();

    var registerWidget = function () {
        return {
            load: function (widgetSettings) {
                var $title = $('h2.title');
                $title.text('Percentage Complete');

                return WidgetHelpers.WidgetStatusHelper.Success();
            }
        }
    }

    VSS.register("FeaturePercentage-widget", registerWidget);

    VSS.notifyLoadSucceeded();
});
