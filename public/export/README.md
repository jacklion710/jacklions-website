Create a folder for a new export and export your patch there
adjust "file": "/export/<FOLDER_NAME>/media/<FILE_NAME>" in your dependencies.json

In your web page adjust await RNBOsetup("/export/<FOLDER_NAME>/<PATCH_NAME>.json", context);
and
let dependenciesResponse = await fetch("/export/<FOLDER_NAME>/dependencies.json");