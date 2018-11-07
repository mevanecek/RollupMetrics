//https://github.com/Microsoft/vss-web-extension-sdk

VSS.init({
    explicitNotifyLoaded: true,
    usePlatformStyles: true
});

VSS.require(["TFS/Dashboards/WidgetHelpers", "TFS/WorkItemTracking/RestClient"],
    function (WidgetHelpers, TFS_Wit_WebApi) {

        //https://docs.microsoft.com/en-us/vsts/extend/develop/styles-from-widget-sdk?view=vsts
        WidgetHelpers.IncludeWidgetStyles();
        WidgetHelpers.IncludeWidgetConfigurationStyles();

        var registerWidget = function () {

            // See https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-dashboard-widget?view=vsts#part-2-hello-world-with-azure-devops-services-rest-api
            var projectId = VSS.getWebContext().project.id;

            var getQueryInfo = function (widgetSettings) {
                // Get a WIT client to make REST calls to Azure DevOps Services
                return TFS_Wit_WebApi.getClient().getQuery(projectId, "Shared Queries/Features")
                    .then(function (query) {
                        // Do something with the query
                        // Create a list with query details                                
                        var $list = $('<ul>');
                        $list.append($('<li>').text("Query Id: " + query.id));
                        $list.append($('<li>').text("Query Name: " + query.name));
                        $list.append($('<li>').text("Created By: " + (query.createdBy ? query.createdBy.displayName : "<unknown>")));

                        // Append the list to the query-info-container
                        var $container = $('#query-info-container');
                        $container.empty();
                        $container.append($list);

                        return WidgetHelpers.WidgetStatusHelper.Success();
                    }, function (error) {
                        return WidgetHelpers.WidgetStatusHelper.Failure(error.message);
                    });
            }

            return {
                load: function (widgetSettings) {
                    var $title = $('h2.title');
                    $title.text('Percentage Complete');

                    var projectId = VSS.getWebContext().project.id;

                    return getQueryInfo(widgetSettings);
                }
            }
        }

        VSS.register("FeaturePercentage-widget", registerWidget);

        VSS.notifyLoadSucceeded();
    }
);
