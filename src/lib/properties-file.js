import fs from "fs";
import yaml from "js-yaml";

/**
 * Load properties file into properties object
 * A property is a key/value pair.
 *
 * @param path
 *
 * @return {Object} properties
 */
export function loadPropertiesFile(path) {
  let doc;
  try {
    const contents = fs.readFileSync(path, "utf8");
    doc = yaml.safeLoad(contents);
  } catch (error) {
    console.log(error);
  }

  return doc;
}

/**
 * Save properties object into properties file
 * A property is a key/value pair.
 *
 * @param path
 * @param obj
 *
 */
export function savePropertiesFile(path, obj) {
  const envVars = {};
  // group env based on its environment_scope
  obj.forEach((envVar) => {
    if (!envVars[envVar.environment_scope]) {
      envVars[envVar.environment_scope] = [];
    }
    envVars[envVar.environment_scope].push(`${envVar.key}: ${envVar.value}`);
  });

  const contents = [];
  Object.keys(envVars).forEach((env) => {
    contents.push(`# environment_scope: ${env}`);
    contents.push(envVars[env].join("\n"));
  });

  try {
    // const string = yaml.safeDump(contents);
    fs.writeFileSync(path, contents.join("\n"), "utf8");
  } catch (error) {
    console.log(error);
  }
}
