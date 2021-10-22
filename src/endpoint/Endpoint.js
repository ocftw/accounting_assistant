global.doGet = (request) => {
    let scriptName = request.parameters.script[0];
    console.log(request);
    return FOSRequire("EndpointService").call("script:" + scriptName, request.parameters, "goGet");
}