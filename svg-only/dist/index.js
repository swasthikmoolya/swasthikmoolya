module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9548:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(7472);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 7117:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __webpack_require__(9548);
const file_command_1 = __webpack_require__(2469);
const utils_1 = __webpack_require__(7472);
const os = __importStar(__webpack_require__(2087));
const path = __importStar(__webpack_require__(5622));
const oidc_utils_1 = __webpack_require__(5172);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 2469:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(5747));
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(7472);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5172:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __webpack_require__(9926);
const auth_1 = __webpack_require__(9206);
const core_1 = __webpack_require__(7117);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 7472:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 9206:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 9926:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __webpack_require__(8605);
const https = __webpack_require__(7211);
const pm = __webpack_require__(3466);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __webpack_require__(9382);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 3466:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 3353:
/***/ ((module) => {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ 3197:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var concatMap = __webpack_require__(4527);
var balanced = __webpack_require__(3353);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),

/***/ 4527:
/***/ ((module) => {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 8945:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(5747)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(4403)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),

/***/ 4403:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(5622);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(5747);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),

/***/ 3561:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(9244)


/***/ }),

/***/ 9244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const stream = __webpack_require__(2413)
const EventEmitter = __webpack_require__(8614)
const LZWEncoder = __webpack_require__(4348)
const NeuQuant = __webpack_require__(3829)
const { OctreeQuant, Color } = __webpack_require__(9328)

class ByteArray {
  constructor() {
    this.data = []
  }

  getData() {
    return Buffer.from(this.data)
  }

  writeByte(val) {
    this.data.push(val)
  }

  writeUTFBytes(str) {
    for (var len = str.length, i = 0; i < len; i++) {
      this.writeByte(str.charCodeAt(i))
    }
  }

  writeBytes(array, offset, length) {
    for (var len = length || array.length, i = offset || 0; i < len; i++) {
      this.writeByte(array[i])
    }
  }
}

class GIFEncoder extends EventEmitter {
  constructor(width, height, algorithm = 'neuquant', useOptimizer = false, totalFrames = 0) {
    super()

    this.width = ~~width
    this.height = ~~height
    this.algorithm = algorithm
    this.useOptimizer = useOptimizer
    this.totalFrames = totalFrames
    this.frames = 1
    this.threshold = 90
    this.indexedPixels = null
    this.palSizeNeu = 7
    this.palSizeOct = 7
    this.sample = 10
    this.colorTab = null
    this.reuseTab = null
    this.colorDepth = null
    this.usedEntry = new Array()
    this.firstFrame = true
    this.started = false
    this.image = null
    this.prevImage = null
    this.dispose = -1
    this.repeat = 0
    this.delay = 0
    this.transparent = null
    this.transIndex = 0
    this.readStreams = []
    this.out = new ByteArray()
  }

  createReadStream(rs) {
    if (!rs) {
      rs = new stream.Readable()
      rs._read = function() {}
    }
    this.readStreams.push(rs)
    return rs
  }

  emitData() {
    if (this.readStreams.length === 0) {
      return
    }
    if (this.out.data.length) {
      this.readStreams.forEach(rs => {
        rs.push(Buffer.from(this.out.data))
      })
      this.out.data = []
    }
  }

  start() {
    this.out.writeUTFBytes('GIF89a')
    this.started = true
    this.emitData()
  }

  end() {
    if (this.readStreams.length === null) {
      return
    }
    this.emitData()
    this.readStreams.forEach(rs => rs.push(null))
    this.readStreams = []
  }

  addFrame(input) {
    if (input && input.getImageData) {
      this.image = input.getImageData(0, 0, this.width, this.height).data
    } else {
      this.image = input
    }

    this.analyzePixels()

    if (this.firstFrame) {
      this.writeLSD()
      this.writePalette()
      if (this.repeat >= 0) {
        this.writeNetscapeExt()
      }
    }

    this.writeGraphicCtrlExt()
    this.writeImageDesc()
    if (!this.firstFrame) {
      this.writePalette()
    }
    this.writePixels()
    this.firstFrame = false
    this.emitData()

    if (this.totalFrames) {
      this.emit('progress', Math.floor((this.frames++ / this.totalFrames) * 100))
    }
  }

  analyzePixels() {
    const w = this.width
    const h = this.height

    var data = this.image

    if (this.useOptimizer && this.prevImage) {
      var delta = 0
      for (var len = data.length, i = 0; i < len; i += 4) {
        if (
          data[i] !== this.prevImage[i] ||
          data[i + 1] !== this.prevImage[i + 1] ||
          data[i + 2] !== this.prevImage[i + 2]
        ) {
          delta++
        }
      }
      const match = 100 - Math.ceil((delta / (data.length / 4)) * 100)
      this.reuseTab = match >= this.threshold
    }

    this.prevImage = data

    if (this.algorithm === 'neuquant') {
      var count = 0
      this.pixels = new Uint8Array(w * h * 3)

      for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
          var b = i * w * 4 + j * 4
          this.pixels[count++] = data[b]
          this.pixels[count++] = data[b + 1]
          this.pixels[count++] = data[b + 2]
        }
      }

      var nPix = this.pixels.length / 3
      this.indexedPixels = new Uint8Array(nPix)

      if (!this.reuseTab) {
        this.quantizer = new NeuQuant(this.pixels, this.sample)
        this.quantizer.buildColormap()
        this.colorTab = this.quantizer.getColormap()
      }

      var k = 0
      for (var j = 0; j < nPix; j++) {
        var index = this.quantizer.lookupRGB(
          this.pixels[k++] & 0xff,
          this.pixels[k++] & 0xff,
          this.pixels[k++] & 0xff
        )

        this.usedEntry[index] = true
        this.indexedPixels[j] = index
      }

      this.colorDepth = 8
      this.palSizeNeu = 7
      this.pixels = null
    } else if (this.algorithm === 'octree') {
      this.colors = []

      if (!this.reuseTab) {
        this.quantizer = new OctreeQuant()
      }

      for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
          var b = i * w * 4 + j * 4
          const color = new Color(data[b], data[b + 1], data[b + 2])
          this.colors.push(color)

          if (!this.reuseTab) {
            this.quantizer.addColor(color)
          }
        }
      }

      const nPix = this.colors.length
      this.indexedPixels = new Uint8Array(nPix)

      if (!this.reuseTab) {
        this.colorTab = []
        const palette = this.quantizer.makePalette(Math.pow(2, this.palSizeOct + 1))

        for (const p of palette) {
          this.colorTab.push(p.red, p.green, p.blue)
        }
      }

      for (var i = 0; i < nPix; i++) {
        this.indexedPixels[i] = this.quantizer.getPaletteIndex(this.colors[i])
      }

      this.colorDepth = this.palSizeOct + 1
    }

    if (this.transparent !== null) {
      this.transIndex = this.findClosest(this.transparent)

      for (var pixelIndex = 0; pixelIndex < nPix; pixelIndex++) {
        if (this.image[pixelIndex * 4 + 3] == 0) {
          this.indexedPixels[pixelIndex] = this.transIndex
        }
      }
    }
  }

  findClosest(c) {
    if (this.colorTab === null) {
      return -1
    }

    var r = (c & 0xff0000) >> 16
    var g = (c & 0x00ff00) >> 8
    var b = c & 0x0000ff
    var minpos = 0
    var dmin = 256 * 256 * 256
    var len = this.colorTab.length

    for (var i = 0; i < len; ) {
      var index = i / 3
      var dr = r - (this.colorTab[i++] & 0xff)
      var dg = g - (this.colorTab[i++] & 0xff)
      var db = b - (this.colorTab[i++] & 0xff)
      var d = dr * dr + dg * dg + db * db
      if (this.usedEntry[index] && d < dmin) {
        dmin = d
        minpos = index
      }
    }

    return minpos
  }

  setFrameRate(fps) {
    this.delay = Math.round(100 / fps)
  }

  setDelay(ms) {
    this.delay = Math.round(ms / 10)
  }

  setDispose(code) {
    if (code >= 0) {
      this.dispose = code
    }
  }

  setRepeat(repeat) {
    this.repeat = repeat
  }

  setTransparent(color) {
    this.transparent = color
  }

  setQuality(quality) {
    if (quality < 1) {
      quality = 1
    }
    this.quality = quality
  }

  setThreshold(threshold) {
    if (threshold > 100) {
      threshold = 100
    } else if (threshold < 0) {
      threshold = 0
    }
    this.threshold = threshold
  }

  setPaletteSize(size) {
    if (size > 7) {
      size = 7
    } else if (size < 4) {
      size = 4
    }
    this.palSizeOct = size
  }

  writeLSD() {
    this.writeShort(this.width)
    this.writeShort(this.height)

    this.out.writeByte(0x80 | 0x70 | 0x00 | this.palSizeNeu)

    this.out.writeByte(0)
    this.out.writeByte(0)
  }

  writeGraphicCtrlExt() {
    this.out.writeByte(0x21)
    this.out.writeByte(0xf9)
    this.out.writeByte(4)

    var transp, disp
    if (this.transparent === null) {
      transp = 0
      disp = 0
    } else {
      transp = 1
      disp = 2
    }

    if (this.dispose >= 0) {
      disp = this.dispose & 7
    }
    disp <<= 2

    this.out.writeByte(0 | disp | 0 | transp)

    this.writeShort(this.delay)
    this.out.writeByte(this.transIndex)
    this.out.writeByte(0)
  }

  writeNetscapeExt() {
    this.out.writeByte(0x21)
    this.out.writeByte(0xff)
    this.out.writeByte(11)
    this.out.writeUTFBytes('NETSCAPE2.0')
    this.out.writeByte(3)
    this.out.writeByte(1)
    this.writeShort(this.repeat)
    this.out.writeByte(0)
  }

  writeImageDesc() {
    this.out.writeByte(0x2c)
    this.writeShort(0)
    this.writeShort(0)
    this.writeShort(this.width)
    this.writeShort(this.height)

    if (this.firstFrame) {
      this.out.writeByte(0)
    } else {
      this.out.writeByte(0x80 | 0 | 0 | 0 | this.palSizeNeu)
    }
  }

  writePalette() {
    this.out.writeBytes(this.colorTab)
    var n = 3 * 256 - this.colorTab.length
    for (var i = 0; i < n; i++) {
      this.out.writeByte(0)
    }
  }

  writeShort(pValue) {
    this.out.writeByte(pValue & 0xff)
    this.out.writeByte((pValue >> 8) & 0xff)
  }

  writePixels() {
    var enc = new LZWEncoder(this.width, this.height, this.indexedPixels, this.colorDepth)
    enc.encode(this.out)
  }

  finish() {
    this.out.writeByte(0x3b)
    this.end()
  }
}

module.exports = GIFEncoder


/***/ }),

/***/ 4348:
/***/ ((module) => {

/*
  LZWEncoder.js

  Authors
  Kevin Weiner (original Java version - kweiner@fmsware.com)
  Thibault Imbert (AS3 version - bytearray.org)
  Johan Nordberg (JS version - code@johan-nordberg.com)

  Acknowledgements
  GIFCOMPR.C - GIF Image compression routines
  Lempel-Ziv compression based on 'compress'. GIF modifications by
  David Rowley (mgardi@watdcsu.waterloo.edu)
  GIF Image compression - modified 'compress'
  Based on: compress.c - File compression ala IEEE Computer, June 1984.
  By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
  Jim McKie (decvax!mcvax!jim)
  Steve Davies (decvax!vax135!petsd!peora!srd)
  Ken Turkowski (decvax!decwrl!turtlevax!ken)
  James A. Woods (decvax!ihnp4!ames!jaw)
  Joe Orost (decvax!vax135!petsd!joe)
*/

var EOF = -1
var BITS = 12
var HSIZE = 5003 // 80% occupancy
var masks = [
  0x0000,
  0x0001,
  0x0003,
  0x0007,
  0x000f,
  0x001f,
  0x003f,
  0x007f,
  0x00ff,
  0x01ff,
  0x03ff,
  0x07ff,
  0x0fff,
  0x1fff,
  0x3fff,
  0x7fff,
  0xffff
]

function LZWEncoder(width, height, pixels, colorDepth) {
  var initCodeSize = Math.max(2, colorDepth)

  var accum = new Uint8Array(256)
  var htab = new Int32Array(HSIZE)
  var codetab = new Int32Array(HSIZE)

  var cur_accum,
    cur_bits = 0
  var a_count
  var free_ent = 0 // first unused entry
  var maxcode

  // block compression parameters -- after all codes are used up,
  // and compression rate changes, start over.
  var clear_flg = false

  // Algorithm: use open addressing double hashing (no chaining) on the
  // prefix code / next character combination. We do a variant of Knuth's
  // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
  // secondary probe. Here, the modular division first probe is gives way
  // to a faster exclusive-or manipulation. Also do block compression with
  // an adaptive reset, whereby the code table is cleared when the compression
  // ratio decreases, but after the table fills. The variable-length output
  // codes are re-sized at this point, and a special CLEAR code is generated
  // for the decompressor. Late addition: construct the table according to
  // file size for noticeable speed improvement on small files. Please direct
  // questions about this implementation to ames!jaw.
  var g_init_bits, ClearCode, EOFCode

  // Add a character to the end of the current packet, and if it is 254
  // characters, flush the packet to disk.
  function char_out(c, outs) {
    accum[a_count++] = c
    if (a_count >= 254) flush_char(outs)
  }

  // Clear out the hash table
  // table clear for block compress
  function cl_block(outs) {
    cl_hash(HSIZE)
    free_ent = ClearCode + 2
    clear_flg = true
    output(ClearCode, outs)
  }

  // Reset code table
  function cl_hash(hsize) {
    for (var i = 0; i < hsize; ++i) htab[i] = -1
  }

  function compress(init_bits, outs) {
    var fcode, c, i, ent, disp, hsize_reg, hshift

    // Set up the globals: g_init_bits - initial number of bits
    g_init_bits = init_bits

    // Set up the necessary values
    clear_flg = false
    n_bits = g_init_bits
    maxcode = MAXCODE(n_bits)

    ClearCode = 1 << (init_bits - 1)
    EOFCode = ClearCode + 1
    free_ent = ClearCode + 2

    a_count = 0 // clear packet

    ent = nextPixel()

    hshift = 0
    for (fcode = HSIZE; fcode < 65536; fcode *= 2) ++hshift
    hshift = 8 - hshift // set hash code range bound
    hsize_reg = HSIZE
    cl_hash(hsize_reg) // clear hash table

    output(ClearCode, outs)

    outer_loop: while ((c = nextPixel()) != EOF) {
      fcode = (c << BITS) + ent
      i = (c << hshift) ^ ent // xor hashing
      if (htab[i] === fcode) {
        ent = codetab[i]
        continue
      } else if (htab[i] >= 0) {
        // non-empty slot
        disp = hsize_reg - i // secondary hash (after G. Knott)
        if (i === 0) disp = 1
        do {
          if ((i -= disp) < 0) i += hsize_reg
          if (htab[i] === fcode) {
            ent = codetab[i]
            continue outer_loop
          }
        } while (htab[i] >= 0)
      }
      output(ent, outs)
      ent = c
      if (free_ent < 1 << BITS) {
        codetab[i] = free_ent++ // code -> hashtable
        htab[i] = fcode
      } else {
        cl_block(outs)
      }
    }

    // Put out the final code.
    output(ent, outs)
    output(EOFCode, outs)
  }

  function encode(outs) {
    outs.writeByte(initCodeSize) // write "initial code size" byte
    remaining = width * height // reset navigation variables
    curPixel = 0
    compress(initCodeSize + 1, outs) // compress and write the pixel data
    outs.writeByte(0) // write block terminator
  }

  // Flush the packet to disk, and reset the accumulator
  function flush_char(outs) {
    if (a_count > 0) {
      outs.writeByte(a_count)
      outs.writeBytes(accum, 0, a_count)
      a_count = 0
    }
  }

  function MAXCODE(n_bits) {
    return (1 << n_bits) - 1
  }

  // Return the next pixel from the image
  function nextPixel() {
    if (remaining === 0) return EOF
    --remaining
    var pix = pixels[curPixel++]
    return pix & 0xff
  }

  function output(code, outs) {
    cur_accum &= masks[cur_bits]

    if (cur_bits > 0) cur_accum |= code << cur_bits
    else cur_accum = code

    cur_bits += n_bits

    while (cur_bits >= 8) {
      char_out(cur_accum & 0xff, outs)
      cur_accum >>= 8
      cur_bits -= 8
    }

    // If the next entry is going to be too big for the code size,
    // then increase it, if possible.
    if (free_ent > maxcode || clear_flg) {
      if (clear_flg) {
        maxcode = MAXCODE((n_bits = g_init_bits))
        clear_flg = false
      } else {
        ++n_bits
        if (n_bits == BITS) maxcode = 1 << BITS
        else maxcode = MAXCODE(n_bits)
      }
    }

    if (code == EOFCode) {
      // At EOF, write the rest of the buffer.
      while (cur_bits > 0) {
        char_out(cur_accum & 0xff, outs)
        cur_accum >>= 8
        cur_bits -= 8
      }
      flush_char(outs)
    }
  }

  this.encode = encode
}

module.exports = LZWEncoder


/***/ }),

/***/ 9328:
/***/ ((module) => {

/*
  Authors
  Dmitry Alimov (Python version) https://github.com/delimitry/octree_color_quantizer
  Tom MacWright (JavaScript version) https://observablehq.com/@tmcw/octree-color-quantization
*/

const MAX_DEPTH = 8

class OctreeQuant {
  constructor() {
    this.levels = Array.from({ length: MAX_DEPTH }, () => [])
    this.root = new Node(0, this)
  }

  addColor(color) {
    this.root.addColor(color, 0, this)
  }

  makePalette(colorCount) {
    let palette = []
    let paletteIndex = 0
    let leafCount = this.leafNodes.length
    for (let level = MAX_DEPTH - 1; level > -1; level -= 1) {
      if (this.levels[level]) {
        for (let node of this.levels[level]) {
          leafCount -= node.removeLeaves()
          if (leafCount <= colorCount) break
        }
        if (leafCount <= colorCount) break
        this.levels[level] = []
      }
    }
    for (let node of this.leafNodes) {
      if (paletteIndex >= colorCount) break
      if (node.isLeaf) palette.push(node.color)
      node.paletteIndex = paletteIndex
      paletteIndex++
    }
    return palette
  }

  *makePaletteIncremental(colorCount) {
    let palette = []
    let paletteIndex = 0
    let leafCount = this.leafNodes.length
    for (let level = MAX_DEPTH - 1; level > -1; level -= 1) {
      if (this.levels[level]) {
        for (let node of this.levels[level]) {
          leafCount -= node.removeLeaves()
          if (leafCount <= colorCount) break
        }
        if (leafCount <= colorCount) break
        this.levels[level] = []
      }
      yield
    }
    for (let node of this.leafNodes) {
      if (paletteIndex >= colorCount) break
      if (node.isLeaf) palette.push(node.color)
      node.paletteIndex = paletteIndex
      paletteIndex++
    }
    yield
    return palette
  }

  get leafNodes() {
    return this.root.leafNodes
  }

  addLevelNode(level, node) {
    this.levels[level].push(node)
  }

  getPaletteIndex(color) {
    return this.root.getPaletteIndex(color, 0)
  }
}

class Node {
  constructor(level, parent) {
    this._color = new Color(0, 0, 0)
    this.pixelCount = 0
    this.paletteIndex = 0
    this.children = []
    this._debugColor
    if (level < MAX_DEPTH - 1) parent.addLevelNode(level, this)
  }

  get isLeaf() {
    return this.pixelCount > 0
  }

  get leafNodes() {
    let leafNodes = []

    for (let node of this.children) {
      if (!node) continue
      if (node.isLeaf) {
        leafNodes.push(node)
      } else {
        leafNodes.push(...node.leafNodes)
      }
    }

    return leafNodes
  }

  addColor(color, level, parent) {
    if (level >= MAX_DEPTH) {
      this._color.add(color)
      this.pixelCount++
      return
    }
    let index = getColorIndex(color, level)
    if (!this.children[index]) {
      this.children[index] = new Node(level, parent)
    }
    this.children[index].addColor(color, level + 1, parent)
  }

  getPaletteIndex(color, level) {
    if (this.isLeaf) {
      return this.paletteIndex
    }
    let index = getColorIndex(color, level)
    if (this.children[index]) {
      return this.children[index].getPaletteIndex(color, level + 1)
    } else {
      for (let node of this.children) {
        if (node) {
          return node.getPaletteIndex(color, level + 1)
        }
      }
    }
  }

  removeLeaves() {
    let result = 0
    for (let node of this.children) {
      if (!node) continue
      this._color.add(node._color)
      this.pixelCount += node.pixelCount
      result++
    }
    this.children = []
    return result - 1
  }

  get debugColor() {
    if (this._debugColor) return this._debugColor
    if (this.isLeaf) return this.color

    let c = new Color()
    let count = 0

    function traverse(node) {
      for (let child of node.children) {
        if (child.isLeaf) {
          c.add(child._color)
          count++
        } else {
          traverse(child)
        }
      }
    }

    traverse(this)
    return c.normalized(count)
  }

  get color() {
    return this._color.normalized(this.pixelCount)
  }
}

class Color {
  constructor(red = 0, green = 0, blue = 0) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  clone() {
    return new Color(this.red, this.green, this.blue)
  }

  get array() {
    return [this.red, this.green, this.blue, this.red + this.green + this.blue]
  }

  toString() {
    return [this.red, this.green, this.blue].join(',')
  }

  toCSS() {
    return `rgb(${[this.red, this.green, this.blue].map(n => Math.floor(n)).join(',')})`
  }

  normalized(pixelCount) {
    return new Color(this.red / pixelCount, this.green / pixelCount, this.blue / pixelCount)
  }

  add(color) {
    this.red += color.red
    this.green += color.green
    this.blue += color.blue
  }
}

function getColorIndex(color, level) {
  let index = 0
  let mask = 0b10000000 >> level
  if (color.red & mask) index |= 0b100
  if (color.green & mask) index |= 0b010
  if (color.blue & mask) index |= 0b001
  return index
}

module.exports = { OctreeQuant, Node, Color }


/***/ }),

/***/ 3829:
/***/ ((module) => {

/* NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994.
 * See "Kohonen neural networks for optimal colour quantization"
 * in "Network: Computation in Neural Systems" Vol. 5 (1994) pp 351-367.
 * for a discussion of the algorithm.
 * See also  http://members.ozemail.com.au/~dekker/NEUQUANT.HTML
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal
 * in this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons who receive
 * copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 *
 * (JavaScript port 2012 by Johan Nordberg)
 */

var ncycles = 100 // number of learning cycles
var netsize = 256 // number of colors used
var maxnetpos = netsize - 1

// defs for freq and bias
var netbiasshift = 4 // bias for colour values
var intbiasshift = 16 // bias for fractions
var intbias = 1 << intbiasshift
var gammashift = 10
var gamma = 1 << gammashift
var betashift = 10
var beta = intbias >> betashift /* beta = 1/1024 */
var betagamma = intbias << (gammashift - betashift)

// defs for decreasing radius factor
var initrad = netsize >> 3 // for 256 cols, radius starts
var radiusbiasshift = 6 // at 32.0 biased by 6 bits
var radiusbias = 1 << radiusbiasshift
var initradius = initrad * radiusbias //and decreases by a
var radiusdec = 30 // factor of 1/30 each cycle

// defs for decreasing alpha factor
var alphabiasshift = 10 // alpha starts at 1.0
var initalpha = 1 << alphabiasshift
var alphadec // biased by 10 bits

/* radbias and alpharadbias used for radpower calculation */
var radbiasshift = 8
var radbias = 1 << radbiasshift
var alpharadbshift = alphabiasshift + radbiasshift
var alpharadbias = 1 << alpharadbshift

// four primes near 500 - assume no image has a length so large that it is
// divisible by all four primes
var prime1 = 499
var prime2 = 491
var prime3 = 487
var prime4 = 503
var minpicturebytes = 3 * prime4

/*
  Constructor: NeuQuant

  Arguments:

  pixels - array of pixels in RGB format
  samplefac - sampling factor 1 to 30 where lower is better quality

  >
  > pixels = [r, g, b, r, g, b, r, g, b, ..]
  >
*/
function NeuQuant(pixels, samplefac) {
  var network // int[netsize][4]
  var netindex // for network lookup - really 256

  // bias and freq arrays for learning
  var bias
  var freq
  var radpower

  /*
    Private Method: init

    sets up arrays
  */
  function init() {
    network = []
    netindex = new Int32Array(256)
    bias = new Int32Array(netsize)
    freq = new Int32Array(netsize)
    radpower = new Int32Array(netsize >> 3)

    var i, v
    for (i = 0; i < netsize; i++) {
      v = (i << (netbiasshift + 8)) / netsize
      network[i] = new Float64Array([v, v, v, 0])
      //network[i] = [v, v, v, 0]
      freq[i] = intbias / netsize
      bias[i] = 0
    }
  }

  /*
    Private Method: unbiasnet

    unbiases network to give byte values 0..255 and record position i to prepare for sort
  */
  function unbiasnet() {
    for (var i = 0; i < netsize; i++) {
      network[i][0] >>= netbiasshift
      network[i][1] >>= netbiasshift
      network[i][2] >>= netbiasshift
      network[i][3] = i // record color number
    }
  }

  /*
    Private Method: altersingle

    moves neuron *i* towards biased (b,g,r) by factor *alpha*
  */
  function altersingle(alpha, i, b, g, r) {
    network[i][0] -= (alpha * (network[i][0] - b)) / initalpha
    network[i][1] -= (alpha * (network[i][1] - g)) / initalpha
    network[i][2] -= (alpha * (network[i][2] - r)) / initalpha
  }

  /*
    Private Method: alterneigh

    moves neurons in *radius* around index *i* towards biased (b,g,r) by factor *alpha*
  */
  function alterneigh(radius, i, b, g, r) {
    var lo = Math.abs(i - radius)
    var hi = Math.min(i + radius, netsize)

    var j = i + 1
    var k = i - 1
    var m = 1

    var p, a
    while (j < hi || k > lo) {
      a = radpower[m++]

      if (j < hi) {
        p = network[j++]
        p[0] -= (a * (p[0] - b)) / alpharadbias
        p[1] -= (a * (p[1] - g)) / alpharadbias
        p[2] -= (a * (p[2] - r)) / alpharadbias
      }

      if (k > lo) {
        p = network[k--]
        p[0] -= (a * (p[0] - b)) / alpharadbias
        p[1] -= (a * (p[1] - g)) / alpharadbias
        p[2] -= (a * (p[2] - r)) / alpharadbias
      }
    }
  }

  /*
    Private Method: contest

    searches for biased BGR values
  */
  function contest(b, g, r) {
    /*
      finds closest neuron (min dist) and updates freq
      finds best neuron (min dist-bias) and returns position
      for frequently chosen neurons, freq[i] is high and bias[i] is negative
      bias[i] = gamma * ((1 / netsize) - freq[i])
    */

    var bestd = ~(1 << 31)
    var bestbiasd = bestd
    var bestpos = -1
    var bestbiaspos = bestpos

    var i, n, dist, biasdist, betafreq
    for (i = 0; i < netsize; i++) {
      n = network[i]

      dist = Math.abs(n[0] - b) + Math.abs(n[1] - g) + Math.abs(n[2] - r)
      if (dist < bestd) {
        bestd = dist
        bestpos = i
      }

      biasdist = dist - (bias[i] >> (intbiasshift - netbiasshift))
      if (biasdist < bestbiasd) {
        bestbiasd = biasdist
        bestbiaspos = i
      }

      betafreq = freq[i] >> betashift
      freq[i] -= betafreq
      bias[i] += betafreq << gammashift
    }

    freq[bestpos] += beta
    bias[bestpos] -= betagamma

    return bestbiaspos
  }

  /*
    Private Method: inxbuild

    sorts network and builds netindex[0..255]
  */
  function inxbuild() {
    var i,
      j,
      p,
      q,
      smallpos,
      smallval,
      previouscol = 0,
      startpos = 0
    for (i = 0; i < netsize; i++) {
      p = network[i]
      smallpos = i
      smallval = p[1] // index on g
      // find smallest in i..netsize-1
      for (j = i + 1; j < netsize; j++) {
        q = network[j]
        if (q[1] < smallval) {
          // index on g
          smallpos = j
          smallval = q[1] // index on g
        }
      }
      q = network[smallpos]
      // swap p (i) and q (smallpos) entries
      if (i != smallpos) {
        j = q[0]
        q[0] = p[0]
        p[0] = j
        j = q[1]
        q[1] = p[1]
        p[1] = j
        j = q[2]
        q[2] = p[2]
        p[2] = j
        j = q[3]
        q[3] = p[3]
        p[3] = j
      }
      // smallval entry is now in position i

      if (smallval != previouscol) {
        netindex[previouscol] = (startpos + i) >> 1
        for (j = previouscol + 1; j < smallval; j++) netindex[j] = i
        previouscol = smallval
        startpos = i
      }
    }
    netindex[previouscol] = (startpos + maxnetpos) >> 1
    for (j = previouscol + 1; j < 256; j++) netindex[j] = maxnetpos // really 256
  }

  /*
    Private Method: inxsearch

    searches for BGR values 0..255 and returns a color index
  */
  function inxsearch(b, g, r) {
    var a, p, dist

    var bestd = 1000 // biggest possible dist is 256*3
    var best = -1

    var i = netindex[g] // index on g
    var j = i - 1 // start at netindex[g] and work outwards

    while (i < netsize || j >= 0) {
      if (i < netsize) {
        p = network[i]
        dist = p[1] - g // inx key
        if (dist >= bestd) i = netsize
        // stop iter
        else {
          i++
          if (dist < 0) dist = -dist
          a = p[0] - b
          if (a < 0) a = -a
          dist += a
          if (dist < bestd) {
            a = p[2] - r
            if (a < 0) a = -a
            dist += a
            if (dist < bestd) {
              bestd = dist
              best = p[3]
            }
          }
        }
      }
      if (j >= 0) {
        p = network[j]
        dist = g - p[1] // inx key - reverse dif
        if (dist >= bestd) j = -1
        // stop iter
        else {
          j--
          if (dist < 0) dist = -dist
          a = p[0] - b
          if (a < 0) a = -a
          dist += a
          if (dist < bestd) {
            a = p[2] - r
            if (a < 0) a = -a
            dist += a
            if (dist < bestd) {
              bestd = dist
              best = p[3]
            }
          }
        }
      }
    }

    return best
  }

  /*
    Private Method: learn

    "Main Learning Loop"
  */
  function learn() {
    var i

    var lengthcount = pixels.length
    var alphadec = 30 + (samplefac - 1) / 3
    var samplepixels = lengthcount / (3 * samplefac)
    var delta = ~~(samplepixels / ncycles)
    var alpha = initalpha
    var radius = initradius

    var rad = radius >> radiusbiasshift

    if (rad <= 1) rad = 0
    for (i = 0; i < rad; i++) radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad))

    var step
    if (lengthcount < minpicturebytes) {
      samplefac = 1
      step = 3
    } else if (lengthcount % prime1 !== 0) {
      step = 3 * prime1
    } else if (lengthcount % prime2 !== 0) {
      step = 3 * prime2
    } else if (lengthcount % prime3 !== 0) {
      step = 3 * prime3
    } else {
      step = 3 * prime4
    }

    var b, g, r, j
    var pix = 0 // current pixel

    i = 0
    while (i < samplepixels) {
      b = (pixels[pix] & 0xff) << netbiasshift
      g = (pixels[pix + 1] & 0xff) << netbiasshift
      r = (pixels[pix + 2] & 0xff) << netbiasshift

      j = contest(b, g, r)

      altersingle(alpha, j, b, g, r)
      if (rad !== 0) alterneigh(rad, j, b, g, r) // alter neighbours

      pix += step
      if (pix >= lengthcount) pix -= lengthcount

      i++

      if (delta === 0) delta = 1
      if (i % delta === 0) {
        alpha -= alpha / alphadec
        radius -= radius / radiusdec
        rad = radius >> radiusbiasshift

        if (rad <= 1) rad = 0
        for (j = 0; j < rad; j++)
          radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad))
      }
    }
  }

  /*
    Method: buildColormap

    1. initializes network
    2. trains it
    3. removes misconceptions
    4. builds colorindex
  */
  function buildColormap() {
    init()
    learn()
    unbiasnet()
    inxbuild()
  }
  this.buildColormap = buildColormap

  /*
    Method: getColormap

    builds colormap from the index

    returns array in the format:

    >
    > [r, g, b, r, g, b, r, g, b, ..]
    >
  */
  function getColormap() {
    var map = []
    var index = []

    for (var i = 0; i < netsize; i++) index[network[i][3]] = i

    var k = 0
    for (var l = 0; l < netsize; l++) {
      var j = index[l]
      map[k++] = network[j][0]
      map[k++] = network[j][1]
      map[k++] = network[j][2]
    }
    return map
  }
  this.getColormap = getColormap

  /*
    Method: lookupRGB

    looks for the closest *r*, *g*, *b* color in the map and
    returns its index
  */
  this.lookupRGB = inxsearch
}

module.exports = NeuQuant


/***/ }),

/***/ 2821:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.alphasort = alphasort
exports.alphasorti = alphasorti
exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path = __webpack_require__(5622)
var minimatch = __webpack_require__(9566)
var isAbsolute = __webpack_require__(1323)
var Minimatch = minimatch.Minimatch

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),

/***/ 3700:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var fs = __webpack_require__(5747)
var rp = __webpack_require__(8945)
var minimatch = __webpack_require__(9566)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(6919)
var EE = __webpack_require__(8614).EventEmitter
var path = __webpack_require__(5622)
var assert = __webpack_require__(2357)
var isAbsolute = __webpack_require__(1323)
var globSync = __webpack_require__(7433)
var common = __webpack_require__(2821)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(9442)
var util = __webpack_require__(1669)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(7197)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),

/***/ 7433:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = globSync
globSync.GlobSync = GlobSync

var fs = __webpack_require__(5747)
var rp = __webpack_require__(8945)
var minimatch = __webpack_require__(9566)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(3700).Glob
var util = __webpack_require__(1669)
var path = __webpack_require__(5622)
var assert = __webpack_require__(2357)
var isAbsolute = __webpack_require__(1323)
var common = __webpack_require__(2821)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),

/***/ 9442:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wrappy = __webpack_require__(4586)
var reqs = Object.create(null)
var once = __webpack_require__(7197)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ }),

/***/ 6919:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

try {
  var util = __webpack_require__(1669);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __webpack_require__(7526);
}


/***/ }),

/***/ 7526:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 9566:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(5622)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(3197)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),

/***/ 2197:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__webpack_require__(2413));
var http = _interopDefault(__webpack_require__(8605));
var Url = _interopDefault(__webpack_require__(8835));
var whatwgUrl = _interopDefault(__webpack_require__(3932));
var https = _interopDefault(__webpack_require__(7211));
var zlib = _interopDefault(__webpack_require__(8761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __webpack_require__(9609).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');
const URL = Url.URL || whatwgUrl.URL;

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

/**
 * Wrapper around `new URL` to handle arbitrary URLs
 *
 * @param  {string} urlStr
 * @return {void}
 */
function parseURL(urlStr) {
	/*
 	Check whether the URL is absolute or not
 		Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
 	Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
 */
	if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(urlStr)) {
		urlStr = new URL(urlStr).toString();
	}

	// Fallback to old implementation for arbitrary URLs
	return parse_url(urlStr);
}

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parseURL(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parseURL(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parseURL(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

const URL$1 = Url.URL || whatwgUrl.URL;

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;

const isDomainOrSubdomain = function isDomainOrSubdomain(destination, original) {
	const orig = new URL$1(original).hostname;
	const dest = new URL$1(destination).hostname;

	return orig === dest || orig[orig.length - dest.length - 1] === '.' && orig.endsWith(dest);
};

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				let locationURL = null;
				try {
					locationURL = location === null ? null : new URL$1(location, request.url).toString();
				} catch (err) {
					// error here can only be invalid URL in Location: header
					// do not throw when options.redirect == manual
					// let the user extract the errorneous redirect URL
					if (request.redirect !== 'manual') {
						reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, 'invalid-redirect'));
						finalize();
						return;
					}
				}

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						if (!isDomainOrSubdomain(request.url, locationURL)) {
							for (const name of ['authorization', 'www-authenticate', 'cookie', 'cookie2']) {
								requestOpts.headers.delete(name);
							}
						}

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 7197:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wrappy = __webpack_require__(4586)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 1323:
/***/ ((module) => {

"use strict";


function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),

/***/ 2780:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const assert = __webpack_require__(2357)
const path = __webpack_require__(5622)
const fs = __webpack_require__(5747)
let glob = undefined
try {
  glob = __webpack_require__(3700)
} catch (_err) {
  // treat glob as optional.
}

const defaultGlobOpts = {
  nosort: true,
  silent: true
}

// for EMFILE handling
let timeout = 0

const isWindows = (process.platform === "win32")

const defaults = options => {
  const methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(m => {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  if (options.disableGlob !== true && glob === undefined) {
    throw Error('glob dependency not found, set `options.disableGlob = true` if intentional')
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

const rimraf = (p, options, cb) => {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  let busyTries = 0
  let errState = null
  let n = 0

  const next = (er) => {
    errState = errState || er
    if (--n === 0)
      cb(errState)
  }

  const afterGlob = (er, results) => {
    if (er)
      return cb(er)

    n = results.length
    if (n === 0)
      return cb()

    results.forEach(p => {
      const CB = (er) => {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
              busyTries < options.maxBusyTries) {
            busyTries ++
            // try again, with the same exact callback as this one.
            return setTimeout(() => rimraf_(p, options, CB), busyTries * 100)
          }

          // this one won't happen if graceful-fs is used.
          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(() => rimraf_(p, options, CB), timeout ++)
          }

          // already gone
          if (er.code === "ENOENT") er = null
        }

        timeout = 0
        next(er)
      }
      rimraf_(p, options, CB)
    })
  }

  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p])

  options.lstat(p, (er, stat) => {
    if (!er)
      return afterGlob(null, [p])

    glob(p, options.glob, afterGlob)
  })

}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
const rimraf_ = (p, options, cb) => {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, (er, st) => {
    if (er && er.code === "ENOENT")
      return cb(null)

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb)

    if (st && st.isDirectory())
      return rmdir(p, options, er, cb)

    options.unlink(p, er => {
      if (er) {
        if (er.code === "ENOENT")
          return cb(null)
        if (er.code === "EPERM")
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        if (er.code === "EISDIR")
          return rmdir(p, options, er, cb)
      }
      return cb(er)
    })
  })
}

const fixWinEPERM = (p, options, er, cb) => {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.chmod(p, 0o666, er2 => {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      options.stat(p, (er3, stats) => {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, options, er, cb)
        else
          options.unlink(p, cb)
      })
  })
}

const fixWinEPERMSync = (p, options, er) => {
  assert(p)
  assert(options)

  try {
    options.chmodSync(p, 0o666)
  } catch (er2) {
    if (er2.code === "ENOENT")
      return
    else
      throw er
  }

  let stats
  try {
    stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === "ENOENT")
      return
    else
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, options, er)
  else
    options.unlinkSync(p)
}

const rmdir = (p, options, originalEr, cb) => {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, er => {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

const rmkids = (p, options, cb) => {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, (er, files) => {
    if (er)
      return cb(er)
    let n = files.length
    if (n === 0)
      return options.rmdir(p, cb)
    let errState
    files.forEach(f => {
      rimraf(path.join(p, f), options, er => {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          options.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
const rimrafSync = (p, options) => {
  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  let results

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p]
  } else {
    try {
      options.lstatSync(p)
      results = [p]
    } catch (er) {
      results = glob.sync(p, options.glob)
    }
  }

  if (!results.length)
    return

  for (let i = 0; i < results.length; i++) {
    const p = results[i]

    let st
    try {
      st = options.lstatSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return

      // Windows can EPERM on stat.  Life is suffering.
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p, options, er)
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory())
        rmdirSync(p, options, null)
      else
        options.unlinkSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
      if (er.code !== "EISDIR")
        throw er

      rmdirSync(p, options, er)
    }
  }
}

const rmdirSync = (p, options, originalEr) => {
  assert(p)
  assert(options)

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options)
  }
}

const rmkidsSync = (p, options) => {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options))

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  const retries = isWindows ? 100 : 1
  let i = 0
  do {
    let threw = true
    try {
      const ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw)
        continue
    }
  } while (true)
}

module.exports = rimraf
rimraf.sync = rimrafSync


/***/ }),

/***/ 7187:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(3057);
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.I = ArraySet;


/***/ }),

/***/ 3422:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(35);

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),

/***/ 35:
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),

/***/ 9690:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(3057);

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.H = MappingList;


/***/ }),

/***/ 5997:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(3422);
var util = __webpack_require__(3057);
var ArraySet = __webpack_require__(7187)/* .ArraySet */ .I;
var MappingList = __webpack_require__(9690)/* .MappingList */ .H;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),

/***/ 3057:
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

var MAX_CACHED_INPUTS = 32;

/**
 * Takes some function `f(input) -> result` and returns a memoized version of
 * `f`.
 *
 * We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
 * memoization is a dumb-simple, linear least-recently-used cache.
 */
function lruMemoize(f) {
  var cache = [];

  return function(input) {
    for (var i = 0; i < cache.length; i++) {
      if (cache[i].input === input) {
        var temp = cache[0];
        cache[0] = cache[i];
        cache[i] = temp;
        return cache[0].result;
      }
    }

    var result = f(input);

    cache.unshift({
      input,
      result,
    });

    if (cache.length > MAX_CACHED_INPUTS) {
      cache.pop();
    }

    return result;
  };
}

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
var normalize = lruMemoize(function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);
  // Split the path into parts between `/` characters. This is much faster than
  // using `.split(/\/+/g)`.
  var parts = [];
  var start = 0;
  var i = 0;
  while (true) {
    start = i;
    i = path.indexOf("/", start);
    if (i === -1) {
      parts.push(path.slice(start));
      break;
    } else {
      parts.push(path.slice(start, i));
      while (i < path.length && path[i] === "/") {
        i++;
      }
    }
  }

  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
});
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
  var cmp

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),

/***/ 6382:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * Tmp
 *
 * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
 *
 * MIT Licensed
 */

/*
 * Module dependencies.
 */
const fs = __webpack_require__(5747);
const os = __webpack_require__(2087);
const path = __webpack_require__(5622);
const crypto = __webpack_require__(6417);
const _c = { fs: fs.constants, os: os.constants };
const rimraf = __webpack_require__(2780);

/*
 * The working inner variables.
 */
const
  // the random characters to choose from
  RANDOM_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',

  TEMPLATE_PATTERN = /XXXXXX/,

  DEFAULT_TRIES = 3,

  CREATE_FLAGS = (_c.O_CREAT || _c.fs.O_CREAT) | (_c.O_EXCL || _c.fs.O_EXCL) | (_c.O_RDWR || _c.fs.O_RDWR),

  // constants are off on the windows platform and will not match the actual errno codes
  IS_WIN32 = os.platform() === 'win32',
  EBADF = _c.EBADF || _c.os.errno.EBADF,
  ENOENT = _c.ENOENT || _c.os.errno.ENOENT,

  DIR_MODE = 0o700 /* 448 */,
  FILE_MODE = 0o600 /* 384 */,

  EXIT = 'exit',

  // this will hold the objects need to be removed on exit
  _removeObjects = [],

  // API change in fs.rmdirSync leads to error when passing in a second parameter, e.g. the callback
  FN_RMDIR_SYNC = fs.rmdirSync.bind(fs),
  FN_RIMRAF_SYNC = rimraf.sync;

let
  _gracefulCleanup = false;

/**
 * Gets a temporary file name.
 *
 * @param {(Options|tmpNameCallback)} options options or callback
 * @param {?tmpNameCallback} callback the callback function
 */
function tmpName(options, callback) {
  const
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1];

  try {
    _assertAndSanitizeOptions(opts);
  } catch (err) {
    return cb(err);
  }

  let tries = opts.tries;
  (function _getUniqueName() {
    try {
      const name = _generateTmpName(opts);

      // check whether the path exists then retry if needed
      fs.stat(name, function (err) {
        /* istanbul ignore else */
        if (!err) {
          /* istanbul ignore else */
          if (tries-- > 0) return _getUniqueName();

          return cb(new Error('Could not get a unique tmp filename, max tries reached ' + name));
        }

        cb(null, name);
      });
    } catch (err) {
      cb(err);
    }
  }());
}

/**
 * Synchronous version of tmpName.
 *
 * @param {Object} options
 * @returns {string} the generated random name
 * @throws {Error} if the options are invalid or could not generate a filename
 */
function tmpNameSync(options) {
  const
    args = _parseArguments(options),
    opts = args[0];

  _assertAndSanitizeOptions(opts);

  let tries = opts.tries;
  do {
    const name = _generateTmpName(opts);
    try {
      fs.statSync(name);
    } catch (e) {
      return name;
    }
  } while (tries-- > 0);

  throw new Error('Could not get a unique tmp filename, max tries reached');
}

/**
 * Creates and opens a temporary file.
 *
 * @param {(Options|null|undefined|fileCallback)} options the config options or the callback function or null or undefined
 * @param {?fileCallback} callback
 */
function file(options, callback) {
  const
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1];

  // gets a temporary filename
  tmpName(opts, function _tmpNameCreated(err, name) {
    /* istanbul ignore else */
    if (err) return cb(err);

    // create and open the file
    fs.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err, fd) {
      /* istanbu ignore else */
      if (err) return cb(err);

      if (opts.discardDescriptor) {
        return fs.close(fd, function _discardCallback(possibleErr) {
          // the chance of getting an error on close here is rather low and might occur in the most edgiest cases only
          return cb(possibleErr, name, undefined, _prepareTmpFileRemoveCallback(name, -1, opts, false));
        });
      } else {
        // detachDescriptor passes the descriptor whereas discardDescriptor closes it, either way, we no longer care
        // about the descriptor
        const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
        cb(null, name, fd, _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, false));
      }
    });
  });
}

/**
 * Synchronous version of file.
 *
 * @param {Options} options
 * @returns {FileSyncObject} object consists of name, fd and removeCallback
 * @throws {Error} if cannot create a file
 */
function fileSync(options) {
  const
    args = _parseArguments(options),
    opts = args[0];

  const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
  const name = tmpNameSync(opts);
  var fd = fs.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
  /* istanbul ignore else */
  if (opts.discardDescriptor) {
    fs.closeSync(fd);
    fd = undefined;
  }

  return {
    name: name,
    fd: fd,
    removeCallback: _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, true)
  };
}

/**
 * Creates a temporary directory.
 *
 * @param {(Options|dirCallback)} options the options or the callback function
 * @param {?dirCallback} callback
 */
function dir(options, callback) {
  const
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1];

  // gets a temporary filename
  tmpName(opts, function _tmpNameCreated(err, name) {
    /* istanbul ignore else */
    if (err) return cb(err);

    // create the directory
    fs.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err) {
      /* istanbul ignore else */
      if (err) return cb(err);

      cb(null, name, _prepareTmpDirRemoveCallback(name, opts, false));
    });
  });
}

/**
 * Synchronous version of dir.
 *
 * @param {Options} options
 * @returns {DirSyncObject} object consists of name and removeCallback
 * @throws {Error} if it cannot create a directory
 */
function dirSync(options) {
  const
    args = _parseArguments(options),
    opts = args[0];

  const name = tmpNameSync(opts);
  fs.mkdirSync(name, opts.mode || DIR_MODE);

  return {
    name: name,
    removeCallback: _prepareTmpDirRemoveCallback(name, opts, true)
  };
}

/**
 * Removes files asynchronously.
 *
 * @param {Object} fdPath
 * @param {Function} next
 * @private
 */
function _removeFileAsync(fdPath, next) {
  const _handler = function (err) {
    if (err && !_isENOENT(err)) {
      // reraise any unanticipated error
      return next(err);
    }
    next();
  };

  if (0 <= fdPath[0])
    fs.close(fdPath[0], function () {
      fs.unlink(fdPath[1], _handler);
    });
  else fs.unlink(fdPath[1], _handler);
}

/**
 * Removes files synchronously.
 *
 * @param {Object} fdPath
 * @private
 */
function _removeFileSync(fdPath) {
  let rethrownException = null;
  try {
    if (0 <= fdPath[0]) fs.closeSync(fdPath[0]);
  } catch (e) {
    // reraise any unanticipated error
    if (!_isEBADF(e) && !_isENOENT(e)) throw e;
  } finally {
    try {
      fs.unlinkSync(fdPath[1]);
    }
    catch (e) {
      // reraise any unanticipated error
      if (!_isENOENT(e)) rethrownException = e;
    }
  }
  if (rethrownException !== null) {
    throw rethrownException;
  }
}

/**
 * Prepares the callback for removal of the temporary file.
 *
 * Returns either a sync callback or a async callback depending on whether
 * fileSync or file was called, which is expressed by the sync parameter.
 *
 * @param {string} name the path of the file
 * @param {number} fd file descriptor
 * @param {Object} opts
 * @param {boolean} sync
 * @returns {fileCallback | fileCallbackSync}
 * @private
 */
function _prepareTmpFileRemoveCallback(name, fd, opts, sync) {
  const removeCallbackSync = _prepareRemoveCallback(_removeFileSync, [fd, name], sync);
  const removeCallback = _prepareRemoveCallback(_removeFileAsync, [fd, name], sync, removeCallbackSync);

  if (!opts.keep) _removeObjects.unshift(removeCallbackSync);

  return sync ? removeCallbackSync : removeCallback;
}

/**
 * Prepares the callback for removal of the temporary directory.
 *
 * Returns either a sync callback or a async callback depending on whether
 * tmpFileSync or tmpFile was called, which is expressed by the sync parameter.
 *
 * @param {string} name
 * @param {Object} opts
 * @param {boolean} sync
 * @returns {Function} the callback
 * @private
 */
function _prepareTmpDirRemoveCallback(name, opts, sync) {
  const removeFunction = opts.unsafeCleanup ? rimraf : fs.rmdir.bind(fs);
  const removeFunctionSync = opts.unsafeCleanup ? FN_RIMRAF_SYNC : FN_RMDIR_SYNC;
  const removeCallbackSync = _prepareRemoveCallback(removeFunctionSync, name, sync);
  const removeCallback = _prepareRemoveCallback(removeFunction, name, sync, removeCallbackSync);
  if (!opts.keep) _removeObjects.unshift(removeCallbackSync);

  return sync ? removeCallbackSync : removeCallback;
}

/**
 * Creates a guarded function wrapping the removeFunction call.
 *
 * The cleanup callback is save to be called multiple times.
 * Subsequent invocations will be ignored.
 *
 * @param {Function} removeFunction
 * @param {string} fileOrDirName
 * @param {boolean} sync
 * @param {cleanupCallbackSync?} cleanupCallbackSync
 * @returns {cleanupCallback | cleanupCallbackSync}
 * @private
 */
function _prepareRemoveCallback(removeFunction, fileOrDirName, sync, cleanupCallbackSync) {
  let called = false;

  // if sync is true, the next parameter will be ignored
  return function _cleanupCallback(next) {

    /* istanbul ignore else */
    if (!called) {
      // remove cleanupCallback from cache
      const toRemove = cleanupCallbackSync || _cleanupCallback;
      const index = _removeObjects.indexOf(toRemove);
      /* istanbul ignore else */
      if (index >= 0) _removeObjects.splice(index, 1);

      called = true;
      if (sync || removeFunction === FN_RMDIR_SYNC || removeFunction === FN_RIMRAF_SYNC) {
        return removeFunction(fileOrDirName);
      } else {
        return removeFunction(fileOrDirName, next || function() {});
      }
    }
  };
}

/**
 * The garbage collector.
 *
 * @private
 */
function _garbageCollector() {
  /* istanbul ignore else */
  if (!_gracefulCleanup) return;

  // the function being called removes itself from _removeObjects,
  // loop until _removeObjects is empty
  while (_removeObjects.length) {
    try {
      _removeObjects[0]();
    } catch (e) {
      // already removed?
    }
  }
}

/**
 * Random name generator based on crypto.
 * Adapted from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
 *
 * @param {number} howMany
 * @returns {string} the generated random name
 * @private
 */
function _randomChars(howMany) {
  let
    value = [],
    rnd = null;

  // make sure that we do not fail because we ran out of entropy
  try {
    rnd = crypto.randomBytes(howMany);
  } catch (e) {
    rnd = crypto.pseudoRandomBytes(howMany);
  }

  for (var i = 0; i < howMany; i++) {
    value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
  }

  return value.join('');
}

/**
 * Helper which determines whether a string s is blank, that is undefined, or empty or null.
 *
 * @private
 * @param {string} s
 * @returns {Boolean} true whether the string s is blank, false otherwise
 */
function _isBlank(s) {
  return s === null || _isUndefined(s) || !s.trim();
}

/**
 * Checks whether the `obj` parameter is defined or not.
 *
 * @param {Object} obj
 * @returns {boolean} true if the object is undefined
 * @private
 */
function _isUndefined(obj) {
  return typeof obj === 'undefined';
}

/**
 * Parses the function arguments.
 *
 * This function helps to have optional arguments.
 *
 * @param {(Options|null|undefined|Function)} options
 * @param {?Function} callback
 * @returns {Array} parsed arguments
 * @private
 */
function _parseArguments(options, callback) {
  /* istanbul ignore else */
  if (typeof options === 'function') {
    return [{}, options];
  }

  /* istanbul ignore else */
  if (_isUndefined(options)) {
    return [{}, callback];
  }

  // copy options so we do not leak the changes we make internally
  const actualOptions = {};
  for (const key of Object.getOwnPropertyNames(options)) {
    actualOptions[key] = options[key];
  }

  return [actualOptions, callback];
}

/**
 * Generates a new temporary name.
 *
 * @param {Object} opts
 * @returns {string} the new random name according to opts
 * @private
 */
function _generateTmpName(opts) {

  const tmpDir = opts.tmpdir;

  /* istanbul ignore else */
  if (!_isUndefined(opts.name))
    return path.join(tmpDir, opts.dir, opts.name);

  /* istanbul ignore else */
  if (!_isUndefined(opts.template))
    return path.join(tmpDir, opts.dir, opts.template).replace(TEMPLATE_PATTERN, _randomChars(6));

  // prefix and postfix
  const name = [
    opts.prefix ? opts.prefix : 'tmp',
    '-',
    process.pid,
    '-',
    _randomChars(12),
    opts.postfix ? '-' + opts.postfix : ''
  ].join('');

  return path.join(tmpDir, opts.dir, name);
}

/**
 * Asserts whether the specified options are valid, also sanitizes options and provides sane defaults for missing
 * options.
 *
 * @param {Options} options
 * @private
 */
function _assertAndSanitizeOptions(options) {

  options.tmpdir = _getTmpDir(options);

  const tmpDir = options.tmpdir;

  /* istanbul ignore else */
  if (!_isUndefined(options.name))
    _assertIsRelative(options.name, 'name', tmpDir);
  /* istanbul ignore else */
  if (!_isUndefined(options.dir))
    _assertIsRelative(options.dir, 'dir', tmpDir);
  /* istanbul ignore else */
  if (!_isUndefined(options.template)) {
    _assertIsRelative(options.template, 'template', tmpDir);
    if (!options.template.match(TEMPLATE_PATTERN))
      throw new Error(`Invalid template, found "${options.template}".`);
  }
  /* istanbul ignore else */
  if (!_isUndefined(options.tries) && isNaN(options.tries) || options.tries < 0)
    throw new Error(`Invalid tries, found "${options.tries}".`);

  // if a name was specified we will try once
  options.tries = _isUndefined(options.name) ? options.tries || DEFAULT_TRIES : 1;
  options.keep = !!options.keep;
  options.detachDescriptor = !!options.detachDescriptor;
  options.discardDescriptor = !!options.discardDescriptor;
  options.unsafeCleanup = !!options.unsafeCleanup;

  // sanitize dir, also keep (multiple) blanks if the user, purportedly sane, requests us to
  options.dir = _isUndefined(options.dir) ? '' : path.relative(tmpDir, _resolvePath(options.dir, tmpDir));
  options.template = _isUndefined(options.template) ? undefined : path.relative(tmpDir, _resolvePath(options.template, tmpDir));
  // sanitize further if template is relative to options.dir
  options.template = _isBlank(options.template) ? undefined : path.relative(options.dir, options.template);

  // for completeness' sake only, also keep (multiple) blanks if the user, purportedly sane, requests us to
  options.name = _isUndefined(options.name) ? undefined : _sanitizeName(options.name);
  options.prefix = _isUndefined(options.prefix) ? '' : options.prefix;
  options.postfix = _isUndefined(options.postfix) ? '' : options.postfix;
}

/**
 * Resolve the specified path name in respect to tmpDir.
 *
 * The specified name might include relative path components, e.g. ../
 * so we need to resolve in order to be sure that is is located inside tmpDir
 *
 * @param name
 * @param tmpDir
 * @returns {string}
 * @private
 */
function _resolvePath(name, tmpDir) {
  const sanitizedName = _sanitizeName(name);
  if (sanitizedName.startsWith(tmpDir)) {
    return path.resolve(sanitizedName);
  } else {
    return path.resolve(path.join(tmpDir, sanitizedName));
  }
}

/**
 * Sanitize the specified path name by removing all quote characters.
 *
 * @param name
 * @returns {string}
 * @private
 */
function _sanitizeName(name) {
  if (_isBlank(name)) {
    return name;
  }
  return name.replace(/["']/g, '');
}

/**
 * Asserts whether specified name is relative to the specified tmpDir.
 *
 * @param {string} name
 * @param {string} option
 * @param {string} tmpDir
 * @throws {Error}
 * @private
 */
function _assertIsRelative(name, option, tmpDir) {
  if (option === 'name') {
    // assert that name is not absolute and does not contain a path
    if (path.isAbsolute(name))
      throw new Error(`${option} option must not contain an absolute path, found "${name}".`);
    // must not fail on valid .<name> or ..<name> or similar such constructs
    let basename = path.basename(name);
    if (basename === '..' || basename === '.' || basename !== name)
      throw new Error(`${option} option must not contain a path, found "${name}".`);
  }
  else { // if (option === 'dir' || option === 'template') {
    // assert that dir or template are relative to tmpDir
    if (path.isAbsolute(name) && !name.startsWith(tmpDir)) {
      throw new Error(`${option} option must be relative to "${tmpDir}", found "${name}".`);
    }
    let resolvedPath = _resolvePath(name, tmpDir);
    if (!resolvedPath.startsWith(tmpDir))
      throw new Error(`${option} option must be relative to "${tmpDir}", found "${resolvedPath}".`);
  }
}

/**
 * Helper for testing against EBADF to compensate changes made to Node 7.x under Windows.
 *
 * @private
 */
function _isEBADF(error) {
  return _isExpectedError(error, -EBADF, 'EBADF');
}

/**
 * Helper for testing against ENOENT to compensate changes made to Node 7.x under Windows.
 *
 * @private
 */
function _isENOENT(error) {
  return _isExpectedError(error, -ENOENT, 'ENOENT');
}

/**
 * Helper to determine whether the expected error code matches the actual code and errno,
 * which will differ between the supported node versions.
 *
 * - Node >= 7.0:
 *   error.code {string}
 *   error.errno {number} any numerical value will be negated
 *
 * CAVEAT
 *
 * On windows, the errno for EBADF is -4083 but os.constants.errno.EBADF is different and we must assume that ENOENT
 * is no different here.
 *
 * @param {SystemError} error
 * @param {number} errno
 * @param {string} code
 * @private
 */
function _isExpectedError(error, errno, code) {
  return IS_WIN32 ? error.code === code : error.code === code && error.errno === errno;
}

/**
 * Sets the graceful cleanup.
 *
 * If graceful cleanup is set, tmp will remove all controlled temporary objects on process exit, otherwise the
 * temporary objects will remain in place, waiting to be cleaned up on system restart or otherwise scheduled temporary
 * object removals.
 */
function setGracefulCleanup() {
  _gracefulCleanup = true;
}

/**
 * Returns the currently configured tmp dir from os.tmpdir().
 *
 * @private
 * @param {?Options} options
 * @returns {string} the currently configured tmp dir
 */
function _getTmpDir(options) {
  return path.resolve(_sanitizeName(options && options.tmpdir || os.tmpdir()));
}

// Install process exit listener
process.addListener(EXIT, _garbageCollector);

/**
 * Configuration options.
 *
 * @typedef {Object} Options
 * @property {?boolean} keep the temporary object (file or dir) will not be garbage collected
 * @property {?number} tries the number of tries before give up the name generation
 * @property (?int) mode the access mode, defaults are 0o700 for directories and 0o600 for files
 * @property {?string} template the "mkstemp" like filename template
 * @property {?string} name fixed name relative to tmpdir or the specified dir option
 * @property {?string} dir tmp directory relative to the root tmp directory in use
 * @property {?string} prefix prefix for the generated name
 * @property {?string} postfix postfix for the generated name
 * @property {?string} tmpdir the root tmp directory which overrides the os tmpdir
 * @property {?boolean} unsafeCleanup recursively removes the created temporary directory, even when it's not empty
 * @property {?boolean} detachDescriptor detaches the file descriptor, caller is responsible for closing the file, tmp will no longer try closing the file during garbage collection
 * @property {?boolean} discardDescriptor discards the file descriptor (closes file, fd is -1), tmp will no longer try closing the file during garbage collection
 */

/**
 * @typedef {Object} FileSyncObject
 * @property {string} name the name of the file
 * @property {string} fd the file descriptor or -1 if the fd has been discarded
 * @property {fileCallback} removeCallback the callback function to remove the file
 */

/**
 * @typedef {Object} DirSyncObject
 * @property {string} name the name of the directory
 * @property {fileCallback} removeCallback the callback function to remove the directory
 */

/**
 * @callback tmpNameCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 */

/**
 * @callback fileCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {number} fd the file descriptor or -1 if the fd had been discarded
 * @param {cleanupCallback} fn the cleanup callback function
 */

/**
 * @callback fileCallbackSync
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {number} fd the file descriptor or -1 if the fd had been discarded
 * @param {cleanupCallbackSync} fn the cleanup callback function
 */

/**
 * @callback dirCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {cleanupCallback} fn the cleanup callback function
 */

/**
 * @callback dirCallbackSync
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {cleanupCallbackSync} fn the cleanup callback function
 */

/**
 * Removes the temporary created file or directory.
 *
 * @callback cleanupCallback
 * @param {simpleCallback} [next] function to call whenever the tmp object needs to be removed
 */

/**
 * Removes the temporary created file or directory.
 *
 * @callback cleanupCallbackSync
 */

/**
 * Callback function for function composition.
 * @see {@link https://github.com/raszi/node-tmp/issues/57|raszi/node-tmp#57}
 *
 * @callback simpleCallback
 */

// exporting all the needed methods

// evaluate _getTmpDir() lazily, mainly for simplifying testing but it also will
// allow users to reconfigure the temporary directory
Object.defineProperty(module.exports, "tmpdir", ({
  enumerable: true,
  configurable: false,
  get: function () {
    return _getTmpDir();
  }
}));

module.exports.dir = dir;
module.exports.dirSync = dirSync;

module.exports.file = file;
module.exports.fileSync = fileSync;

module.exports.tmpName = tmpName;
module.exports.tmpNameSync = tmpNameSync;

module.exports.setGracefulCleanup = setGracefulCleanup;


/***/ }),

/***/ 9878:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var punycode = __webpack_require__(4213);
var mappingTable = __webpack_require__(2069);

var PROCESSING_OPTIONS = {
  TRANSITIONAL: 0,
  NONTRANSITIONAL: 1
};

function normalize(str) { // fix bug in v8
  return str.split('\u0000').map(function (s) { return s.normalize('NFC'); }).join('\u0000');
}

function findStatus(val) {
  var start = 0;
  var end = mappingTable.length - 1;

  while (start <= end) {
    var mid = Math.floor((start + end) / 2);

    var target = mappingTable[mid];
    if (target[0][0] <= val && target[0][1] >= val) {
      return target;
    } else if (target[0][0] > val) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return null;
}

var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function countSymbols(string) {
  return string
    // replace every surrogate pair with a BMP symbol
    .replace(regexAstralSymbols, '_')
    // then get the length
    .length;
}

function mapChars(domain_name, useSTD3, processing_option) {
  var hasError = false;
  var processed = "";

  var len = countSymbols(domain_name);
  for (var i = 0; i < len; ++i) {
    var codePoint = domain_name.codePointAt(i);
    var status = findStatus(codePoint);

    switch (status[1]) {
      case "disallowed":
        hasError = true;
        processed += String.fromCodePoint(codePoint);
        break;
      case "ignored":
        break;
      case "mapped":
        processed += String.fromCodePoint.apply(String, status[2]);
        break;
      case "deviation":
        if (processing_option === PROCESSING_OPTIONS.TRANSITIONAL) {
          processed += String.fromCodePoint.apply(String, status[2]);
        } else {
          processed += String.fromCodePoint(codePoint);
        }
        break;
      case "valid":
        processed += String.fromCodePoint(codePoint);
        break;
      case "disallowed_STD3_mapped":
        if (useSTD3) {
          hasError = true;
          processed += String.fromCodePoint(codePoint);
        } else {
          processed += String.fromCodePoint.apply(String, status[2]);
        }
        break;
      case "disallowed_STD3_valid":
        if (useSTD3) {
          hasError = true;
        }

        processed += String.fromCodePoint(codePoint);
        break;
    }
  }

  return {
    string: processed,
    error: hasError
  };
}

var combiningMarksRegex = /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDE2C-\uDE37\uDEDF-\uDEEA\uDF01-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDE30-\uDE40\uDEAB-\uDEB7]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD83A[\uDCD0-\uDCD6]|\uDB40[\uDD00-\uDDEF]/;

function validateLabel(label, processing_option) {
  if (label.substr(0, 4) === "xn--") {
    label = punycode.toUnicode(label);
    processing_option = PROCESSING_OPTIONS.NONTRANSITIONAL;
  }

  var error = false;

  if (normalize(label) !== label ||
      (label[3] === "-" && label[4] === "-") ||
      label[0] === "-" || label[label.length - 1] === "-" ||
      label.indexOf(".") !== -1 ||
      label.search(combiningMarksRegex) === 0) {
    error = true;
  }

  var len = countSymbols(label);
  for (var i = 0; i < len; ++i) {
    var status = findStatus(label.codePointAt(i));
    if ((processing === PROCESSING_OPTIONS.TRANSITIONAL && status[1] !== "valid") ||
        (processing === PROCESSING_OPTIONS.NONTRANSITIONAL &&
         status[1] !== "valid" && status[1] !== "deviation")) {
      error = true;
      break;
    }
  }

  return {
    label: label,
    error: error
  };
}

function processing(domain_name, useSTD3, processing_option) {
  var result = mapChars(domain_name, useSTD3, processing_option);
  result.string = normalize(result.string);

  var labels = result.string.split(".");
  for (var i = 0; i < labels.length; ++i) {
    try {
      var validation = validateLabel(labels[i]);
      labels[i] = validation.label;
      result.error = result.error || validation.error;
    } catch(e) {
      result.error = true;
    }
  }

  return {
    string: labels.join("."),
    error: result.error
  };
}

module.exports.toASCII = function(domain_name, useSTD3, processing_option, verifyDnsLength) {
  var result = processing(domain_name, useSTD3, processing_option);
  var labels = result.string.split(".");
  labels = labels.map(function(l) {
    try {
      return punycode.toASCII(l);
    } catch(e) {
      result.error = true;
      return l;
    }
  });

  if (verifyDnsLength) {
    var total = labels.slice(0, labels.length - 1).join(".").length;
    if (total.length > 253 || total.length === 0) {
      result.error = true;
    }

    for (var i=0; i < labels.length; ++i) {
      if (labels.length > 63 || labels.length === 0) {
        result.error = true;
        break;
      }
    }
  }

  if (result.error) return null;
  return labels.join(".");
};

module.exports.toUnicode = function(domain_name, useSTD3) {
  var result = processing(domain_name, useSTD3, PROCESSING_OPTIONS.NONTRANSITIONAL);

  return {
    domain: result.string,
    error: result.error
  };
};

module.exports.PROCESSING_OPTIONS = PROCESSING_OPTIONS;


/***/ }),

/***/ 9382:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(1418);


/***/ }),

/***/ 1418:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var net = __webpack_require__(1631);
var tls = __webpack_require__(4016);
var http = __webpack_require__(8605);
var https = __webpack_require__(7211);
var events = __webpack_require__(8614);
var assert = __webpack_require__(2357);
var util = __webpack_require__(1669);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 6749:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const usm = __webpack_require__(7167);

exports.implementation = class URLImpl {
  constructor(constructorArgs) {
    const url = constructorArgs[0];
    const base = constructorArgs[1];

    let parsedBase = null;
    if (base !== undefined) {
      parsedBase = usm.basicURLParse(base);
      if (parsedBase === "failure") {
        throw new TypeError("Invalid base URL");
      }
    }

    const parsedURL = usm.basicURLParse(url, { baseURL: parsedBase });
    if (parsedURL === "failure") {
      throw new TypeError("Invalid URL");
    }

    this._url = parsedURL;

    // TODO: query stuff
  }

  get href() {
    return usm.serializeURL(this._url);
  }

  set href(v) {
    const parsedURL = usm.basicURLParse(v);
    if (parsedURL === "failure") {
      throw new TypeError("Invalid URL");
    }

    this._url = parsedURL;
  }

  get origin() {
    return usm.serializeURLOrigin(this._url);
  }

  get protocol() {
    return this._url.scheme + ":";
  }

  set protocol(v) {
    usm.basicURLParse(v + ":", { url: this._url, stateOverride: "scheme start" });
  }

  get username() {
    return this._url.username;
  }

  set username(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setTheUsername(this._url, v);
  }

  get password() {
    return this._url.password;
  }

  set password(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setThePassword(this._url, v);
  }

  get host() {
    const url = this._url;

    if (url.host === null) {
      return "";
    }

    if (url.port === null) {
      return usm.serializeHost(url.host);
    }

    return usm.serializeHost(url.host) + ":" + usm.serializeInteger(url.port);
  }

  set host(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "host" });
  }

  get hostname() {
    if (this._url.host === null) {
      return "";
    }

    return usm.serializeHost(this._url.host);
  }

  set hostname(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "hostname" });
  }

  get port() {
    if (this._url.port === null) {
      return "";
    }

    return usm.serializeInteger(this._url.port);
  }

  set port(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    if (v === "") {
      this._url.port = null;
    } else {
      usm.basicURLParse(v, { url: this._url, stateOverride: "port" });
    }
  }

  get pathname() {
    if (this._url.cannotBeABaseURL) {
      return this._url.path[0];
    }

    if (this._url.path.length === 0) {
      return "";
    }

    return "/" + this._url.path.join("/");
  }

  set pathname(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    this._url.path = [];
    usm.basicURLParse(v, { url: this._url, stateOverride: "path start" });
  }

  get search() {
    if (this._url.query === null || this._url.query === "") {
      return "";
    }

    return "?" + this._url.query;
  }

  set search(v) {
    // TODO: query stuff

    const url = this._url;

    if (v === "") {
      url.query = null;
      return;
    }

    const input = v[0] === "?" ? v.substring(1) : v;
    url.query = "";
    usm.basicURLParse(input, { url, stateOverride: "query" });
  }

  get hash() {
    if (this._url.fragment === null || this._url.fragment === "") {
      return "";
    }

    return "#" + this._url.fragment;
  }

  set hash(v) {
    if (v === "") {
      this._url.fragment = null;
      return;
    }

    const input = v[0] === "#" ? v.substring(1) : v;
    this._url.fragment = "";
    usm.basicURLParse(input, { url: this._url, stateOverride: "fragment" });
  }

  toJSON() {
    return this.href;
  }
};


/***/ }),

/***/ 8607:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(4772);
const utils = __webpack_require__(2596);
const Impl = __webpack_require__(6749);

const impl = utils.implSymbol;

function URL(url) {
  if (!this || this[impl] || !(this instanceof URL)) {
    throw new TypeError("Failed to construct 'URL': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'URL': 1 argument required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }
  args[0] = conversions["USVString"](args[0]);
  if (args[1] !== undefined) {
  args[1] = conversions["USVString"](args[1]);
  }

  module.exports.setup(this, args);
}

URL.prototype.toJSON = function toJSON() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 0; ++i) {
    args[i] = arguments[i];
  }
  return this[impl].toJSON.apply(this[impl], args);
};
Object.defineProperty(URL.prototype, "href", {
  get() {
    return this[impl].href;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].href = V;
  },
  enumerable: true,
  configurable: true
});

URL.prototype.toString = function () {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this.href;
};

Object.defineProperty(URL.prototype, "origin", {
  get() {
    return this[impl].origin;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "protocol", {
  get() {
    return this[impl].protocol;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].protocol = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "username", {
  get() {
    return this[impl].username;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].username = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "password", {
  get() {
    return this[impl].password;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].password = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "host", {
  get() {
    return this[impl].host;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].host = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "hostname", {
  get() {
    return this[impl].hostname;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].hostname = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "port", {
  get() {
    return this[impl].port;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].port = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "pathname", {
  get() {
    return this[impl].pathname;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].pathname = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "search", {
  get() {
    return this[impl].search;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].search = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "hash", {
  get() {
    return this[impl].hash;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].hash = V;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(URL.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: URL,
  expose: {
    Window: { URL: URL },
    Worker: { URL: URL }
  }
};



/***/ }),

/***/ 3932:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.URL = __webpack_require__(8607).interface;
exports.serializeURL = __webpack_require__(7167).serializeURL;
exports.serializeURLOrigin = __webpack_require__(7167).serializeURLOrigin;
exports.basicURLParse = __webpack_require__(7167).basicURLParse;
exports.setTheUsername = __webpack_require__(7167).setTheUsername;
exports.setThePassword = __webpack_require__(7167).setThePassword;
exports.serializeHost = __webpack_require__(7167).serializeHost;
exports.serializeInteger = __webpack_require__(7167).serializeInteger;
exports.parseURL = __webpack_require__(7167).parseURL;


/***/ }),

/***/ 7167:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const punycode = __webpack_require__(4213);
const tr46 = __webpack_require__(9878);

const specialSchemes = {
  ftp: 21,
  file: null,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

const failure = Symbol("failure");

function countSymbols(str) {
  return punycode.ucs2.decode(str).length;
}

function at(input, idx) {
  const c = input[idx];
  return isNaN(c) ? undefined : String.fromCodePoint(c);
}

function isASCIIDigit(c) {
  return c >= 0x30 && c <= 0x39;
}

function isASCIIAlpha(c) {
  return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A);
}

function isASCIIAlphanumeric(c) {
  return isASCIIAlpha(c) || isASCIIDigit(c);
}

function isASCIIHex(c) {
  return isASCIIDigit(c) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66);
}

function isSingleDot(buffer) {
  return buffer === "." || buffer.toLowerCase() === "%2e";
}

function isDoubleDot(buffer) {
  buffer = buffer.toLowerCase();
  return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
}

function isWindowsDriveLetterCodePoints(cp1, cp2) {
  return isASCIIAlpha(cp1) && (cp2 === 58 || cp2 === 124);
}

function isWindowsDriveLetterString(string) {
  return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
}

function isNormalizedWindowsDriveLetterString(string) {
  return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
}

function containsForbiddenHostCodePoint(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|\?|@|\[|\\|\]/) !== -1;
}

function containsForbiddenHostCodePointExcludingPercent(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|\?|@|\[|\\|\]/) !== -1;
}

function isSpecialScheme(scheme) {
  return specialSchemes[scheme] !== undefined;
}

function isSpecial(url) {
  return isSpecialScheme(url.scheme);
}

function defaultPort(scheme) {
  return specialSchemes[scheme];
}

function percentEncode(c) {
  let hex = c.toString(16).toUpperCase();
  if (hex.length === 1) {
    hex = "0" + hex;
  }

  return "%" + hex;
}

function utf8PercentEncode(c) {
  const buf = new Buffer(c);

  let str = "";

  for (let i = 0; i < buf.length; ++i) {
    str += percentEncode(buf[i]);
  }

  return str;
}

function utf8PercentDecode(str) {
  const input = new Buffer(str);
  const output = [];
  for (let i = 0; i < input.length; ++i) {
    if (input[i] !== 37) {
      output.push(input[i]);
    } else if (input[i] === 37 && isASCIIHex(input[i + 1]) && isASCIIHex(input[i + 2])) {
      output.push(parseInt(input.slice(i + 1, i + 3).toString(), 16));
      i += 2;
    } else {
      output.push(input[i]);
    }
  }
  return new Buffer(output).toString();
}

function isC0ControlPercentEncode(c) {
  return c <= 0x1F || c > 0x7E;
}

const extraPathPercentEncodeSet = new Set([32, 34, 35, 60, 62, 63, 96, 123, 125]);
function isPathPercentEncode(c) {
  return isC0ControlPercentEncode(c) || extraPathPercentEncodeSet.has(c);
}

const extraUserinfoPercentEncodeSet =
  new Set([47, 58, 59, 61, 64, 91, 92, 93, 94, 124]);
function isUserinfoPercentEncode(c) {
  return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
}

function percentEncodeChar(c, encodeSetPredicate) {
  const cStr = String.fromCodePoint(c);

  if (encodeSetPredicate(c)) {
    return utf8PercentEncode(cStr);
  }

  return cStr;
}

function parseIPv4Number(input) {
  let R = 10;

  if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
    input = input.substring(2);
    R = 16;
  } else if (input.length >= 2 && input.charAt(0) === "0") {
    input = input.substring(1);
    R = 8;
  }

  if (input === "") {
    return 0;
  }

  const regex = R === 10 ? /[^0-9]/ : (R === 16 ? /[^0-9A-Fa-f]/ : /[^0-7]/);
  if (regex.test(input)) {
    return failure;
  }

  return parseInt(input, R);
}

function parseIPv4(input) {
  const parts = input.split(".");
  if (parts[parts.length - 1] === "") {
    if (parts.length > 1) {
      parts.pop();
    }
  }

  if (parts.length > 4) {
    return input;
  }

  const numbers = [];
  for (const part of parts) {
    if (part === "") {
      return input;
    }
    const n = parseIPv4Number(part);
    if (n === failure) {
      return input;
    }

    numbers.push(n);
  }

  for (let i = 0; i < numbers.length - 1; ++i) {
    if (numbers[i] > 255) {
      return failure;
    }
  }
  if (numbers[numbers.length - 1] >= Math.pow(256, 5 - numbers.length)) {
    return failure;
  }

  let ipv4 = numbers.pop();
  let counter = 0;

  for (const n of numbers) {
    ipv4 += n * Math.pow(256, 3 - counter);
    ++counter;
  }

  return ipv4;
}

function serializeIPv4(address) {
  let output = "";
  let n = address;

  for (let i = 1; i <= 4; ++i) {
    output = String(n % 256) + output;
    if (i !== 4) {
      output = "." + output;
    }
    n = Math.floor(n / 256);
  }

  return output;
}

function parseIPv6(input) {
  const address = [0, 0, 0, 0, 0, 0, 0, 0];
  let pieceIndex = 0;
  let compress = null;
  let pointer = 0;

  input = punycode.ucs2.decode(input);

  if (input[pointer] === 58) {
    if (input[pointer + 1] !== 58) {
      return failure;
    }

    pointer += 2;
    ++pieceIndex;
    compress = pieceIndex;
  }

  while (pointer < input.length) {
    if (pieceIndex === 8) {
      return failure;
    }

    if (input[pointer] === 58) {
      if (compress !== null) {
        return failure;
      }
      ++pointer;
      ++pieceIndex;
      compress = pieceIndex;
      continue;
    }

    let value = 0;
    let length = 0;

    while (length < 4 && isASCIIHex(input[pointer])) {
      value = value * 0x10 + parseInt(at(input, pointer), 16);
      ++pointer;
      ++length;
    }

    if (input[pointer] === 46) {
      if (length === 0) {
        return failure;
      }

      pointer -= length;

      if (pieceIndex > 6) {
        return failure;
      }

      let numbersSeen = 0;

      while (input[pointer] !== undefined) {
        let ipv4Piece = null;

        if (numbersSeen > 0) {
          if (input[pointer] === 46 && numbersSeen < 4) {
            ++pointer;
          } else {
            return failure;
          }
        }

        if (!isASCIIDigit(input[pointer])) {
          return failure;
        }

        while (isASCIIDigit(input[pointer])) {
          const number = parseInt(at(input, pointer));
          if (ipv4Piece === null) {
            ipv4Piece = number;
          } else if (ipv4Piece === 0) {
            return failure;
          } else {
            ipv4Piece = ipv4Piece * 10 + number;
          }
          if (ipv4Piece > 255) {
            return failure;
          }
          ++pointer;
        }

        address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;

        ++numbersSeen;

        if (numbersSeen === 2 || numbersSeen === 4) {
          ++pieceIndex;
        }
      }

      if (numbersSeen !== 4) {
        return failure;
      }

      break;
    } else if (input[pointer] === 58) {
      ++pointer;
      if (input[pointer] === undefined) {
        return failure;
      }
    } else if (input[pointer] !== undefined) {
      return failure;
    }

    address[pieceIndex] = value;
    ++pieceIndex;
  }

  if (compress !== null) {
    let swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      const temp = address[compress + swaps - 1];
      address[compress + swaps - 1] = address[pieceIndex];
      address[pieceIndex] = temp;
      --pieceIndex;
      --swaps;
    }
  } else if (compress === null && pieceIndex !== 8) {
    return failure;
  }

  return address;
}

function serializeIPv6(address) {
  let output = "";
  const seqResult = findLongestZeroSequence(address);
  const compress = seqResult.idx;
  let ignore0 = false;

  for (let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex) {
    if (ignore0 && address[pieceIndex] === 0) {
      continue;
    } else if (ignore0) {
      ignore0 = false;
    }

    if (compress === pieceIndex) {
      const separator = pieceIndex === 0 ? "::" : ":";
      output += separator;
      ignore0 = true;
      continue;
    }

    output += address[pieceIndex].toString(16);

    if (pieceIndex !== 7) {
      output += ":";
    }
  }

  return output;
}

function parseHost(input, isSpecialArg) {
  if (input[0] === "[") {
    if (input[input.length - 1] !== "]") {
      return failure;
    }

    return parseIPv6(input.substring(1, input.length - 1));
  }

  if (!isSpecialArg) {
    return parseOpaqueHost(input);
  }

  const domain = utf8PercentDecode(input);
  const asciiDomain = tr46.toASCII(domain, false, tr46.PROCESSING_OPTIONS.NONTRANSITIONAL, false);
  if (asciiDomain === null) {
    return failure;
  }

  if (containsForbiddenHostCodePoint(asciiDomain)) {
    return failure;
  }

  const ipv4Host = parseIPv4(asciiDomain);
  if (typeof ipv4Host === "number" || ipv4Host === failure) {
    return ipv4Host;
  }

  return asciiDomain;
}

function parseOpaqueHost(input) {
  if (containsForbiddenHostCodePointExcludingPercent(input)) {
    return failure;
  }

  let output = "";
  const decoded = punycode.ucs2.decode(input);
  for (let i = 0; i < decoded.length; ++i) {
    output += percentEncodeChar(decoded[i], isC0ControlPercentEncode);
  }
  return output;
}

function findLongestZeroSequence(arr) {
  let maxIdx = null;
  let maxLen = 1; // only find elements > 1
  let currStart = null;
  let currLen = 0;

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] !== 0) {
      if (currLen > maxLen) {
        maxIdx = currStart;
        maxLen = currLen;
      }

      currStart = null;
      currLen = 0;
    } else {
      if (currStart === null) {
        currStart = i;
      }
      ++currLen;
    }
  }

  // if trailing zeros
  if (currLen > maxLen) {
    maxIdx = currStart;
    maxLen = currLen;
  }

  return {
    idx: maxIdx,
    len: maxLen
  };
}

function serializeHost(host) {
  if (typeof host === "number") {
    return serializeIPv4(host);
  }

  // IPv6 serializer
  if (host instanceof Array) {
    return "[" + serializeIPv6(host) + "]";
  }

  return host;
}

function trimControlChars(url) {
  return url.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g, "");
}

function trimTabAndNewline(url) {
  return url.replace(/\u0009|\u000A|\u000D/g, "");
}

function shortenPath(url) {
  const path = url.path;
  if (path.length === 0) {
    return;
  }
  if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
    return;
  }

  path.pop();
}

function includesCredentials(url) {
  return url.username !== "" || url.password !== "";
}

function cannotHaveAUsernamePasswordPort(url) {
  return url.host === null || url.host === "" || url.cannotBeABaseURL || url.scheme === "file";
}

function isNormalizedWindowsDriveLetter(string) {
  return /^[A-Za-z]:$/.test(string);
}

function URLStateMachine(input, base, encodingOverride, url, stateOverride) {
  this.pointer = 0;
  this.input = input;
  this.base = base || null;
  this.encodingOverride = encodingOverride || "utf-8";
  this.stateOverride = stateOverride;
  this.url = url;
  this.failure = false;
  this.parseError = false;

  if (!this.url) {
    this.url = {
      scheme: "",
      username: "",
      password: "",
      host: null,
      port: null,
      path: [],
      query: null,
      fragment: null,

      cannotBeABaseURL: false
    };

    const res = trimControlChars(this.input);
    if (res !== this.input) {
      this.parseError = true;
    }
    this.input = res;
  }

  const res = trimTabAndNewline(this.input);
  if (res !== this.input) {
    this.parseError = true;
  }
  this.input = res;

  this.state = stateOverride || "scheme start";

  this.buffer = "";
  this.atFlag = false;
  this.arrFlag = false;
  this.passwordTokenSeenFlag = false;

  this.input = punycode.ucs2.decode(this.input);

  for (; this.pointer <= this.input.length; ++this.pointer) {
    const c = this.input[this.pointer];
    const cStr = isNaN(c) ? undefined : String.fromCodePoint(c);

    // exec state machine
    const ret = this["parse " + this.state](c, cStr);
    if (!ret) {
      break; // terminate algorithm
    } else if (ret === failure) {
      this.failure = true;
      break;
    }
  }
}

URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c, cStr) {
  if (isASCIIAlpha(c)) {
    this.buffer += cStr.toLowerCase();
    this.state = "scheme";
  } else if (!this.stateOverride) {
    this.state = "no scheme";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse scheme"] = function parseScheme(c, cStr) {
  if (isASCIIAlphanumeric(c) || c === 43 || c === 45 || c === 46) {
    this.buffer += cStr.toLowerCase();
  } else if (c === 58) {
    if (this.stateOverride) {
      if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
        return false;
      }

      if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
        return false;
      }

      if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
        return false;
      }

      if (this.url.scheme === "file" && (this.url.host === "" || this.url.host === null)) {
        return false;
      }
    }
    this.url.scheme = this.buffer;
    this.buffer = "";
    if (this.stateOverride) {
      return false;
    }
    if (this.url.scheme === "file") {
      if (this.input[this.pointer + 1] !== 47 || this.input[this.pointer + 2] !== 47) {
        this.parseError = true;
      }
      this.state = "file";
    } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
      this.state = "special relative or authority";
    } else if (isSpecial(this.url)) {
      this.state = "special authority slashes";
    } else if (this.input[this.pointer + 1] === 47) {
      this.state = "path or authority";
      ++this.pointer;
    } else {
      this.url.cannotBeABaseURL = true;
      this.url.path.push("");
      this.state = "cannot-be-a-base-URL path";
    }
  } else if (!this.stateOverride) {
    this.buffer = "";
    this.state = "no scheme";
    this.pointer = -1;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c) {
  if (this.base === null || (this.base.cannotBeABaseURL && c !== 35)) {
    return failure;
  } else if (this.base.cannotBeABaseURL && c === 35) {
    this.url.scheme = this.base.scheme;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.url.cannotBeABaseURL = true;
    this.state = "fragment";
  } else if (this.base.scheme === "file") {
    this.state = "file";
    --this.pointer;
  } else {
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c) {
  if (c === 47 && this.input[this.pointer + 1] === 47) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c) {
  if (c === 47) {
    this.state = "authority";
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative"] = function parseRelative(c) {
  this.url.scheme = this.base.scheme;
  if (isNaN(c)) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
  } else if (c === 47) {
    this.state = "relative slash";
  } else if (c === 63) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = "";
    this.state = "query";
  } else if (c === 35) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.state = "fragment";
  } else if (isSpecial(this.url) && c === 92) {
    this.parseError = true;
    this.state = "relative slash";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice(0, this.base.path.length - 1);

    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c) {
  if (isSpecial(this.url) && (c === 47 || c === 92)) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "special authority ignore slashes";
  } else if (c === 47) {
    this.state = "authority";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c) {
  if (c === 47 && this.input[this.pointer + 1] === 47) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "special authority ignore slashes";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c) {
  if (c !== 47 && c !== 92) {
    this.state = "authority";
    --this.pointer;
  } else {
    this.parseError = true;
  }

  return true;
};

URLStateMachine.prototype["parse authority"] = function parseAuthority(c, cStr) {
  if (c === 64) {
    this.parseError = true;
    if (this.atFlag) {
      this.buffer = "%40" + this.buffer;
    }
    this.atFlag = true;

    // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
    const len = countSymbols(this.buffer);
    for (let pointer = 0; pointer < len; ++pointer) {
      const codePoint = this.buffer.codePointAt(pointer);

      if (codePoint === 58 && !this.passwordTokenSeenFlag) {
        this.passwordTokenSeenFlag = true;
        continue;
      }
      const encodedCodePoints = percentEncodeChar(codePoint, isUserinfoPercentEncode);
      if (this.passwordTokenSeenFlag) {
        this.url.password += encodedCodePoints;
      } else {
        this.url.username += encodedCodePoints;
      }
    }
    this.buffer = "";
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92)) {
    if (this.atFlag && this.buffer === "") {
      this.parseError = true;
      return failure;
    }
    this.pointer -= countSymbols(this.buffer) + 1;
    this.buffer = "";
    this.state = "host";
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse hostname"] =
URLStateMachine.prototype["parse host"] = function parseHostName(c, cStr) {
  if (this.stateOverride && this.url.scheme === "file") {
    --this.pointer;
    this.state = "file host";
  } else if (c === 58 && !this.arrFlag) {
    if (this.buffer === "") {
      this.parseError = true;
      return failure;
    }

    const host = parseHost(this.buffer, isSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "port";
    if (this.stateOverride === "hostname") {
      return false;
    }
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92)) {
    --this.pointer;
    if (isSpecial(this.url) && this.buffer === "") {
      this.parseError = true;
      return failure;
    } else if (this.stateOverride && this.buffer === "" &&
               (includesCredentials(this.url) || this.url.port !== null)) {
      this.parseError = true;
      return false;
    }

    const host = parseHost(this.buffer, isSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "path start";
    if (this.stateOverride) {
      return false;
    }
  } else {
    if (c === 91) {
      this.arrFlag = true;
    } else if (c === 93) {
      this.arrFlag = false;
    }
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse port"] = function parsePort(c, cStr) {
  if (isASCIIDigit(c)) {
    this.buffer += cStr;
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92) ||
             this.stateOverride) {
    if (this.buffer !== "") {
      const port = parseInt(this.buffer);
      if (port > Math.pow(2, 16) - 1) {
        this.parseError = true;
        return failure;
      }
      this.url.port = port === defaultPort(this.url.scheme) ? null : port;
      this.buffer = "";
    }
    if (this.stateOverride) {
      return false;
    }
    this.state = "path start";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

const fileOtherwiseCodePoints = new Set([47, 92, 63, 35]);

URLStateMachine.prototype["parse file"] = function parseFile(c) {
  this.url.scheme = "file";

  if (c === 47 || c === 92) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "file slash";
  } else if (this.base !== null && this.base.scheme === "file") {
    if (isNaN(c)) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = this.base.query;
    } else if (c === 63) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = "";
      this.state = "query";
    } else if (c === 35) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = this.base.query;
      this.url.fragment = "";
      this.state = "fragment";
    } else {
      if (this.input.length - this.pointer - 1 === 0 || // remaining consists of 0 code points
          !isWindowsDriveLetterCodePoints(c, this.input[this.pointer + 1]) ||
          (this.input.length - this.pointer - 1 >= 2 && // remaining has at least 2 code points
           !fileOtherwiseCodePoints.has(this.input[this.pointer + 2]))) {
        this.url.host = this.base.host;
        this.url.path = this.base.path.slice();
        shortenPath(this.url);
      } else {
        this.parseError = true;
      }

      this.state = "path";
      --this.pointer;
    }
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c) {
  if (c === 47 || c === 92) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "file host";
  } else {
    if (this.base !== null && this.base.scheme === "file") {
      if (isNormalizedWindowsDriveLetterString(this.base.path[0])) {
        this.url.path.push(this.base.path[0]);
      } else {
        this.url.host = this.base.host;
      }
    }
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file host"] = function parseFileHost(c, cStr) {
  if (isNaN(c) || c === 47 || c === 92 || c === 63 || c === 35) {
    --this.pointer;
    if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
      this.parseError = true;
      this.state = "path";
    } else if (this.buffer === "") {
      this.url.host = "";
      if (this.stateOverride) {
        return false;
      }
      this.state = "path start";
    } else {
      let host = parseHost(this.buffer, isSpecial(this.url));
      if (host === failure) {
        return failure;
      }
      if (host === "localhost") {
        host = "";
      }
      this.url.host = host;

      if (this.stateOverride) {
        return false;
      }

      this.buffer = "";
      this.state = "path start";
    }
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse path start"] = function parsePathStart(c) {
  if (isSpecial(this.url)) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "path";

    if (c !== 47 && c !== 92) {
      --this.pointer;
    }
  } else if (!this.stateOverride && c === 63) {
    this.url.query = "";
    this.state = "query";
  } else if (!this.stateOverride && c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else if (c !== undefined) {
    this.state = "path";
    if (c !== 47) {
      --this.pointer;
    }
  }

  return true;
};

URLStateMachine.prototype["parse path"] = function parsePath(c) {
  if (isNaN(c) || c === 47 || (isSpecial(this.url) && c === 92) ||
      (!this.stateOverride && (c === 63 || c === 35))) {
    if (isSpecial(this.url) && c === 92) {
      this.parseError = true;
    }

    if (isDoubleDot(this.buffer)) {
      shortenPath(this.url);
      if (c !== 47 && !(isSpecial(this.url) && c === 92)) {
        this.url.path.push("");
      }
    } else if (isSingleDot(this.buffer) && c !== 47 &&
               !(isSpecial(this.url) && c === 92)) {
      this.url.path.push("");
    } else if (!isSingleDot(this.buffer)) {
      if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
        if (this.url.host !== "" && this.url.host !== null) {
          this.parseError = true;
          this.url.host = "";
        }
        this.buffer = this.buffer[0] + ":";
      }
      this.url.path.push(this.buffer);
    }
    this.buffer = "";
    if (this.url.scheme === "file" && (c === undefined || c === 63 || c === 35)) {
      while (this.url.path.length > 1 && this.url.path[0] === "") {
        this.parseError = true;
        this.url.path.shift();
      }
    }
    if (c === 63) {
      this.url.query = "";
      this.state = "query";
    }
    if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += percentEncodeChar(c, isPathPercentEncode);
  }

  return true;
};

URLStateMachine.prototype["parse cannot-be-a-base-URL path"] = function parseCannotBeABaseURLPath(c) {
  if (c === 63) {
    this.url.query = "";
    this.state = "query";
  } else if (c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else {
    // TODO: Add: not a URL code point
    if (!isNaN(c) && c !== 37) {
      this.parseError = true;
    }

    if (c === 37 &&
        (!isASCIIHex(this.input[this.pointer + 1]) ||
         !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    if (!isNaN(c)) {
      this.url.path[0] = this.url.path[0] + percentEncodeChar(c, isC0ControlPercentEncode);
    }
  }

  return true;
};

URLStateMachine.prototype["parse query"] = function parseQuery(c, cStr) {
  if (isNaN(c) || (!this.stateOverride && c === 35)) {
    if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
      this.encodingOverride = "utf-8";
    }

    const buffer = new Buffer(this.buffer); // TODO: Use encoding override instead
    for (let i = 0; i < buffer.length; ++i) {
      if (buffer[i] < 0x21 || buffer[i] > 0x7E || buffer[i] === 0x22 || buffer[i] === 0x23 ||
          buffer[i] === 0x3C || buffer[i] === 0x3E) {
        this.url.query += percentEncode(buffer[i]);
      } else {
        this.url.query += String.fromCodePoint(buffer[i]);
      }
    }

    this.buffer = "";
    if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse fragment"] = function parseFragment(c) {
  if (isNaN(c)) { // do nothing
  } else if (c === 0x0) {
    this.parseError = true;
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.url.fragment += percentEncodeChar(c, isC0ControlPercentEncode);
  }

  return true;
};

function serializeURL(url, excludeFragment) {
  let output = url.scheme + ":";
  if (url.host !== null) {
    output += "//";

    if (url.username !== "" || url.password !== "") {
      output += url.username;
      if (url.password !== "") {
        output += ":" + url.password;
      }
      output += "@";
    }

    output += serializeHost(url.host);

    if (url.port !== null) {
      output += ":" + url.port;
    }
  } else if (url.host === null && url.scheme === "file") {
    output += "//";
  }

  if (url.cannotBeABaseURL) {
    output += url.path[0];
  } else {
    for (const string of url.path) {
      output += "/" + string;
    }
  }

  if (url.query !== null) {
    output += "?" + url.query;
  }

  if (!excludeFragment && url.fragment !== null) {
    output += "#" + url.fragment;
  }

  return output;
}

function serializeOrigin(tuple) {
  let result = tuple.scheme + "://";
  result += serializeHost(tuple.host);

  if (tuple.port !== null) {
    result += ":" + tuple.port;
  }

  return result;
}

module.exports.serializeURL = serializeURL;

module.exports.serializeURLOrigin = function (url) {
  // https://url.spec.whatwg.org/#concept-url-origin
  switch (url.scheme) {
    case "blob":
      try {
        return module.exports.serializeURLOrigin(module.exports.parseURL(url.path[0]));
      } catch (e) {
        // serializing an opaque origin returns "null"
        return "null";
      }
    case "ftp":
    case "gopher":
    case "http":
    case "https":
    case "ws":
    case "wss":
      return serializeOrigin({
        scheme: url.scheme,
        host: url.host,
        port: url.port
      });
    case "file":
      // spec says "exercise to the reader", chrome says "file://"
      return "file://";
    default:
      // serializing an opaque origin returns "null"
      return "null";
  }
};

module.exports.basicURLParse = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  const usm = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
  if (usm.failure) {
    return "failure";
  }

  return usm.url;
};

module.exports.setTheUsername = function (url, username) {
  url.username = "";
  const decoded = punycode.ucs2.decode(username);
  for (let i = 0; i < decoded.length; ++i) {
    url.username += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
  }
};

module.exports.setThePassword = function (url, password) {
  url.password = "";
  const decoded = punycode.ucs2.decode(password);
  for (let i = 0; i < decoded.length; ++i) {
    url.password += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
  }
};

module.exports.serializeHost = serializeHost;

module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;

module.exports.serializeInteger = function (integer) {
  return String(integer);
};

module.exports.parseURL = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  // We don't handle blobs, so this just delegates:
  return module.exports.basicURLParse(input, { baseURL: options.baseURL, encodingOverride: options.encodingOverride });
};


/***/ }),

/***/ 2596:
/***/ ((module) => {

"use strict";


module.exports.mixin = function mixin(target, source) {
  const keys = Object.getOwnPropertyNames(source);
  for (let i = 0; i < keys.length; ++i) {
    Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
  }
};

module.exports.wrapperSymbol = Symbol("wrapper");
module.exports.implSymbol = Symbol("impl");

module.exports.wrapperForImpl = function (impl) {
  return impl[module.exports.wrapperSymbol];
};

module.exports.implForWrapper = function (wrapper) {
  return wrapper[module.exports.implSymbol];
};



/***/ }),

/***/ 4772:
/***/ ((module) => {

"use strict";


var conversions = {};
module.exports = conversions;

function sign(x) {
    return x < 0 ? -1 : 1;
}

function evenRound(x) {
    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.
    if ((x % 1) === 0.5 && (x & 1) === 0) { // [even number].5; round down (i.e. floor)
        return Math.floor(x);
    } else {
        return Math.round(x);
    }
}

function createNumberConversion(bitLength, typeOpts) {
    if (!typeOpts.unsigned) {
        --bitLength;
    }
    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);
    const upperBound = Math.pow(2, bitLength) - 1;

    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);
    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);

    return function(V, opts) {
        if (!opts) opts = {};

        let x = +V;

        if (opts.enforceRange) {
            if (!Number.isFinite(x)) {
                throw new TypeError("Argument is not a finite number");
            }

            x = sign(x) * Math.floor(Math.abs(x));
            if (x < lowerBound || x > upperBound) {
                throw new TypeError("Argument is not in byte range");
            }

            return x;
        }

        if (!isNaN(x) && opts.clamp) {
            x = evenRound(x);

            if (x < lowerBound) x = lowerBound;
            if (x > upperBound) x = upperBound;
            return x;
        }

        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }

        x = sign(x) * Math.floor(Math.abs(x));
        x = x % moduloVal;

        if (!typeOpts.unsigned && x >= moduloBound) {
            return x - moduloVal;
        } else if (typeOpts.unsigned) {
            if (x < 0) {
              x += moduloVal;
            } else if (x === -0) { // don't return negative zero
              return 0;
            }
        }

        return x;
    }
}

conversions["void"] = function () {
    return undefined;
};

conversions["boolean"] = function (val) {
    return !!val;
};

conversions["byte"] = createNumberConversion(8, { unsigned: false });
conversions["octet"] = createNumberConversion(8, { unsigned: true });

conversions["short"] = createNumberConversion(16, { unsigned: false });
conversions["unsigned short"] = createNumberConversion(16, { unsigned: true });

conversions["long"] = createNumberConversion(32, { unsigned: false });
conversions["unsigned long"] = createNumberConversion(32, { unsigned: true });

conversions["long long"] = createNumberConversion(32, { unsigned: false, moduloBitLength: 64 });
conversions["unsigned long long"] = createNumberConversion(32, { unsigned: true, moduloBitLength: 64 });

conversions["double"] = function (V) {
    const x = +V;

    if (!Number.isFinite(x)) {
        throw new TypeError("Argument is not a finite floating-point value");
    }

    return x;
};

conversions["unrestricted double"] = function (V) {
    const x = +V;

    if (isNaN(x)) {
        throw new TypeError("Argument is NaN");
    }

    return x;
};

// not quite valid, but good enough for JS
conversions["float"] = conversions["double"];
conversions["unrestricted float"] = conversions["unrestricted double"];

conversions["DOMString"] = function (V, opts) {
    if (!opts) opts = {};

    if (opts.treatNullAsEmptyString && V === null) {
        return "";
    }

    return String(V);
};

conversions["ByteString"] = function (V, opts) {
    const x = String(V);
    let c = undefined;
    for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {
        if (c > 255) {
            throw new TypeError("Argument is not a valid bytestring");
        }
    }

    return x;
};

conversions["USVString"] = function (V) {
    const S = String(V);
    const n = S.length;
    const U = [];
    for (let i = 0; i < n; ++i) {
        const c = S.charCodeAt(i);
        if (c < 0xD800 || c > 0xDFFF) {
            U.push(String.fromCodePoint(c));
        } else if (0xDC00 <= c && c <= 0xDFFF) {
            U.push(String.fromCodePoint(0xFFFD));
        } else {
            if (i === n - 1) {
                U.push(String.fromCodePoint(0xFFFD));
            } else {
                const d = S.charCodeAt(i + 1);
                if (0xDC00 <= d && d <= 0xDFFF) {
                    const a = c & 0x3FF;
                    const b = d & 0x3FF;
                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));
                    ++i;
                } else {
                    U.push(String.fromCodePoint(0xFFFD));
                }
            }
        }
    }

    return U.join('');
};

conversions["Date"] = function (V, opts) {
    if (!(V instanceof Date)) {
        throw new TypeError("Argument is not a Date object");
    }
    if (isNaN(V)) {
        return undefined;
    }

    return V;
};

conversions["RegExp"] = function (V, opts) {
    if (!(V instanceof RegExp)) {
        V = new RegExp(V);
    }

    return V;
};


/***/ }),

/***/ 4586:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 8847:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.generateContributionSnake = void 0;
var github_user_contribution_1 = __webpack_require__(3775);
var userContributionToGrid_1 = __webpack_require__(5740);
var getBestRoute_1 = __webpack_require__(2705);
var snake_1 = __webpack_require__(7087);
var getPathToPose_1 = __webpack_require__(6963);
var generateContributionSnake = function (userName, outputs) { return __awaiter(void 0, void 0, void 0, function () {
    var cells, grid, snake, chain;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("🎣 fetching github user contribution");
                return [4 /*yield*/, (0, github_user_contribution_1.getGithubUserContribution)(userName)];
            case 1:
                cells = _a.sent();
                grid = (0, userContributionToGrid_1.userContributionToGrid)(cells);
                snake = snake_1.snake4;
                console.log("📡 computing best route");
                chain = (0, getBestRoute_1.getBestRoute)(grid, snake);
                chain.push.apply(chain, (0, getPathToPose_1.getPathToPose)(chain.slice(-1)[0], snake));
                return [2 /*return*/, Promise.all(outputs.map(function (out, i) { return __awaiter(void 0, void 0, void 0, function () {
                        var format, drawOptions, animationOptions, _a, createSvg, createGif;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!out)
                                        return [2 /*return*/];
                                    format = out.format, drawOptions = out.drawOptions, animationOptions = out.animationOptions;
                                    _a = format;
                                    switch (_a) {
                                        case "svg": return [3 /*break*/, 1];
                                        case "gif": return [3 /*break*/, 3];
                                    }
                                    return [3 /*break*/, 6];
                                case 1:
                                    console.log("\uD83D\uDD8C creating svg (outputs[".concat(i, "])"));
                                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(7415)); })];
                                case 2:
                                    createSvg = (_b.sent()).createSvg;
                                    return [2 /*return*/, createSvg(grid, cells, chain, drawOptions, animationOptions)];
                                case 3:
                                    console.log("\uD83D\uDCF9 creating gif (outputs[".concat(i, "])"));
                                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(340)); })];
                                case 4:
                                    createGif = (_b.sent()).createGif;
                                    return [4 /*yield*/, createGif(grid, cells, chain, drawOptions, animationOptions)];
                                case 5: return [2 /*return*/, _b.sent()];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); }))];
        }
    });
}); };
exports.generateContributionSnake = generateContributionSnake;


/***/ }),

/***/ 2178:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = __importStar(__webpack_require__(5747));
var path = __importStar(__webpack_require__(5622));
var core = __importStar(__webpack_require__(7117));
var generateContributionSnake_1 = __webpack_require__(8847);
var outputsOptions_1 = __webpack_require__(3379);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var userName, outputs, results_1, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userName = core.getInput("github_user_name");
                outputs = (0, outputsOptions_1.parseOutputsOption)((_a = core.getMultilineInput("outputs")) !== null && _a !== void 0 ? _a : [
                    core.getInput("gif_out_path"),
                    core.getInput("svg_out_path"),
                ]);
                return [4 /*yield*/, (0, generateContributionSnake_1.generateContributionSnake)(userName, outputs)];
            case 1:
                results_1 = _b.sent();
                outputs.forEach(function (out, i) {
                    var result = results_1[i];
                    if ((out === null || out === void 0 ? void 0 : out.filename) && result) {
                        console.log("\uD83D\uDCBE writing to ".concat(out === null || out === void 0 ? void 0 : out.filename));
                        fs.mkdirSync(path.dirname(out === null || out === void 0 ? void 0 : out.filename), { recursive: true });
                        fs.writeFileSync(out === null || out === void 0 ? void 0 : out.filename, result);
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                core.setFailed("Action failed with \"".concat(e_1.message, "\""));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();


/***/ }),

/***/ 3379:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.parseEntry = exports.parseOutputsOption = void 0;
var palettes_1 = __webpack_require__(3848);
var parseOutputsOption = function (lines) { return lines.map(exports.parseEntry); };
exports.parseOutputsOption = parseOutputsOption;
var parseEntry = function (entry) {
    var m = entry.trim().match(/^(.+\.(svg|gif))(\?(.*)|\s*({.*}))?$/);
    if (!m)
        return null;
    var filename = m[1], format = m[2], _ = m[3], q1 = m[4], q2 = m[5];
    var query = q1 !== null && q1 !== void 0 ? q1 : q2;
    var sp = new URLSearchParams(query || "");
    try {
        var o = JSON.parse(query);
        if (Array.isArray(o.color_dots))
            o.color_dots = o.color_dots.join(",");
        if (Array.isArray(o.dark_color_dots))
            o.dark_color_dots = o.dark_color_dots.join(",");
        sp = new URLSearchParams(o);
    }
    catch (err) {
        if (!(err instanceof SyntaxError))
            throw err;
    }
    var drawOptions = __assign({ sizeDotBorderRadius: 2, sizeCell: 16, sizeDot: 12 }, palettes_1.palettes["default"]);
    var animationOptions = { step: 1, frameDuration: 100 };
    {
        var palette = palettes_1.palettes[sp.get("palette")];
        if (palette) {
            Object.assign(drawOptions, palette);
            drawOptions.dark = palette.dark && __assign({}, palette.dark);
        }
    }
    if (sp.has("color_snake"))
        drawOptions.colorSnake = sp.get("color_snake");
    if (sp.has("color_dots")) {
        var colors = sp.get("color_dots").split(/[,;]/);
        drawOptions.colorDots = colors;
        drawOptions.colorEmpty = colors[0];
        drawOptions.dark = undefined;
    }
    if (sp.has("color_dot_border"))
        drawOptions.colorDotBorder = sp.get("color_dot_border");
    if (sp.has("dark_color_dots")) {
        var colors = sp.get("dark_color_dots").split(/[,;]/);
        drawOptions.dark = __assign(__assign({}, drawOptions.dark), { colorDots: colors, colorEmpty: colors[0] });
    }
    if (sp.has("dark_color_dot_border") && drawOptions.dark)
        drawOptions.dark.colorDotBorder = sp.get("color_dot_border");
    if (sp.has("dark_color_snake") && drawOptions.dark)
        drawOptions.dark.colorSnake = sp.get("color_snake");
    return {
        filename: filename,
        format: format,
        drawOptions: drawOptions,
        animationOptions: animationOptions
    };
};
exports.parseEntry = parseEntry;


/***/ }),

/***/ 3848:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.palettes = void 0;
exports.palettes = {
    "github-light": {
        colorDotBorder: "#1b1f230a",
        colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
        colorEmpty: "#ebedf0",
        colorSnake: "purple"
    },
    "github-dark": {
        colorDotBorder: "#1b1f230a",
        colorEmpty: "#161b22",
        colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
        colorSnake: "purple"
    }
};
// aliases
exports.palettes.github = __assign(__assign({}, exports.palettes["github-light"]), { dark: __assign({}, exports.palettes["github-dark"]) });
exports.palettes.default = exports.palettes["github"];


/***/ }),

/***/ 5740:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.userContributionToGrid = void 0;
var grid_1 = __webpack_require__(2881);
var userContributionToGrid = function (cells) {
    var width = Math.max.apply(Math, __spreadArray([0], cells.map(function (c) { return c.x; }), false)) + 1;
    var height = Math.max.apply(Math, __spreadArray([0], cells.map(function (c) { return c.y; }), false)) + 1;
    var grid = (0, grid_1.createEmptyGrid)(width, height);
    for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
        var c = cells_1[_i];
        if (c.level > 0)
            (0, grid_1.setColor)(grid, c.x, c.y, c.level);
        else
            (0, grid_1.setColorEmpty)(grid, c.x, c.y);
    }
    return grid;
};
exports.userContributionToGrid = userContributionToGrid;


/***/ }),

/***/ 1918:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.drawGrid = void 0;
var grid_1 = __webpack_require__(2881);
var pathRoundedRect_1 = __webpack_require__(2356);
var drawGrid = function (ctx, grid, cells, o) {
    var _loop_1 = function (x) {
        var _loop_2 = function (y) {
            if (!cells || cells.some(function (c) { return c.x === x && c.y === y; })) {
                var c = (0, grid_1.getColor)(grid, x, y);
                // @ts-ignore
                var color = !c ? o.colorEmpty : o.colorDots[c];
                ctx.save();
                ctx.translate(x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2, y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2);
                ctx.fillStyle = color;
                ctx.strokeStyle = o.colorDotBorder;
                ctx.lineWidth = 1;
                ctx.beginPath();
                (0, pathRoundedRect_1.pathRoundedRect)(ctx, o.sizeDot, o.sizeDot, o.sizeDotBorderRadius);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        };
        for (var y = grid.height; y--;) {
            _loop_2(y);
        }
    };
    for (var x = grid.width; x--;) {
        _loop_1(x);
    }
};
exports.drawGrid = drawGrid;


/***/ }),

/***/ 7972:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.drawSnakeLerp = exports.drawSnake = void 0;
var pathRoundedRect_1 = __webpack_require__(2356);
var snake_1 = __webpack_require__(9347);
var drawSnake = function (ctx, snake, o) {
    var cells = (0, snake_1.snakeToCells)(snake);
    for (var i = 0; i < cells.length; i++) {
        var u = (i + 1) * 0.6;
        ctx.save();
        ctx.fillStyle = o.colorSnake;
        ctx.translate(cells[i].x * o.sizeCell + u, cells[i].y * o.sizeCell + u);
        ctx.beginPath();
        (0, pathRoundedRect_1.pathRoundedRect)(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
        ctx.fill();
        ctx.restore();
    }
};
exports.drawSnake = drawSnake;
var lerp = function (k, a, b) { return (1 - k) * a + k * b; };
var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
var drawSnakeLerp = function (ctx, snake0, snake1, k, o) {
    var m = 0.8;
    var n = snake0.length / 2;
    for (var i = 0; i < n; i++) {
        var u = (i + 1) * 0.6 * (o.sizeCell / 16);
        var a = (1 - m) * (i / Math.max(n - 1, 1));
        var ki = clamp((k - a) / m, 0, 1);
        var x = lerp(ki, snake0[i * 2 + 0], snake1[i * 2 + 0]) - 2;
        var y = lerp(ki, snake0[i * 2 + 1], snake1[i * 2 + 1]) - 2;
        ctx.save();
        ctx.fillStyle = o.colorSnake;
        ctx.translate(x * o.sizeCell + u, y * o.sizeCell + u);
        ctx.beginPath();
        (0, pathRoundedRect_1.pathRoundedRect)(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
        ctx.fill();
        ctx.restore();
    }
};
exports.drawSnakeLerp = drawSnakeLerp;


/***/ }),

/***/ 3071:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getCanvasWorldSize = exports.drawLerpWorld = exports.drawWorld = exports.drawStack = void 0;
var drawGrid_1 = __webpack_require__(1918);
var drawSnake_1 = __webpack_require__(7972);
var drawStack = function (ctx, stack, max, width, o) {
    ctx.save();
    var m = width / max;
    for (var i = 0; i < stack.length; i++) {
        // @ts-ignore
        ctx.fillStyle = o.colorDots[stack[i]];
        ctx.fillRect(i * m, 0, m + width * 0.005, 10);
    }
    ctx.restore();
};
exports.drawStack = drawStack;
var drawWorld = function (ctx, grid, cells, snake, stack, o) {
    ctx.save();
    ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
    (0, drawGrid_1.drawGrid)(ctx, grid, cells, o);
    (0, drawSnake_1.drawSnake)(ctx, snake, o);
    ctx.restore();
    ctx.save();
    ctx.translate(o.sizeCell, (grid.height + 4) * o.sizeCell);
    var max = grid.data.reduce(function (sum, x) { return sum + +!!x; }, stack.length);
    (0, exports.drawStack)(ctx, stack, max, grid.width * o.sizeCell, o);
    ctx.restore();
    // ctx.save();
    // ctx.translate(o.sizeCell + 100, (grid.height + 4) * o.sizeCell + 100);
    // ctx.scale(0.6, 0.6);
    // drawCircleStack(ctx, stack, o);
    // ctx.restore();
};
exports.drawWorld = drawWorld;
var drawLerpWorld = function (ctx, grid, cells, snake0, snake1, stack, k, o) {
    ctx.save();
    ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
    (0, drawGrid_1.drawGrid)(ctx, grid, cells, o);
    (0, drawSnake_1.drawSnakeLerp)(ctx, snake0, snake1, k, o);
    ctx.translate(0, (grid.height + 2) * o.sizeCell);
    var max = grid.data.reduce(function (sum, x) { return sum + +!!x; }, stack.length);
    (0, exports.drawStack)(ctx, stack, max, grid.width * o.sizeCell, o);
    ctx.restore();
};
exports.drawLerpWorld = drawLerpWorld;
var getCanvasWorldSize = function (grid, o) {
    var width = o.sizeCell * (grid.width + 2);
    var height = o.sizeCell * (grid.height + 4) + 30;
    return { width: width, height: height };
};
exports.getCanvasWorldSize = getCanvasWorldSize;


/***/ }),

/***/ 2356:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.pathRoundedRect = void 0;
var pathRoundedRect = function (ctx, width, height, borderRadius) {
    ctx.moveTo(borderRadius, 0);
    ctx.arcTo(width, 0, width, height, borderRadius);
    ctx.arcTo(width, height, 0, height, borderRadius);
    ctx.arcTo(0, height, 0, 0, borderRadius);
    ctx.arcTo(0, 0, width, 0, borderRadius);
};
exports.pathRoundedRect = pathRoundedRect;


/***/ }),

/***/ 340:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createGif = void 0;
var fs_1 = __importDefault(__webpack_require__(5747));
var path_1 = __importDefault(__webpack_require__(5622));
var child_process_1 = __webpack_require__(3129);
var canvas_1 = __webpack_require__(5338);
var grid_1 = __webpack_require__(2881);
var drawWorld_1 = __webpack_require__(3071);
var step_1 = __webpack_require__(1412);
var tmp_1 = __importDefault(__webpack_require__(6382));
var gifsicle_1 = __importDefault(__webpack_require__(3819));
// @ts-ignore
var gif_encoder_2_1 = __importDefault(__webpack_require__(3561));
var withTmpDir = function (handler) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, dir, cleanUp;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = tmp_1["default"].dirSync({
                    unsafeCleanup: true
                }), dir = _a.name, cleanUp = _a.removeCallback;
                _b.label = 1;
            case 1:
                _b.trys.push([1, , 3, 4]);
                return [4 /*yield*/, handler(dir)];
            case 2: return [2 /*return*/, _b.sent()];
            case 3:
                cleanUp();
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var createGif = function (grid0, cells, chain, drawOptions, animationOptions) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, withTmpDir(function (dir) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, width, height, canvas, ctx, grid, stack, encoder, i, snake0, snake1, k, outFileName, optimizedFileName;
                return __generator(this, function (_b) {
                    _a = (0, drawWorld_1.getCanvasWorldSize)(grid0, drawOptions), width = _a.width, height = _a.height;
                    canvas = (0, canvas_1.createCanvas)(width, height);
                    ctx = canvas.getContext("2d");
                    grid = (0, grid_1.copyGrid)(grid0);
                    stack = [];
                    encoder = new gif_encoder_2_1["default"](width, height, "neuquant", true);
                    encoder.setRepeat(0);
                    encoder.setDelay(animationOptions.frameDuration);
                    encoder.start();
                    for (i = 0; i < chain.length; i += 1) {
                        snake0 = chain[i];
                        snake1 = chain[Math.min(chain.length - 1, i + 1)];
                        (0, step_1.step)(grid, stack, snake0);
                        for (k = 0; k < animationOptions.step; k++) {
                            ctx.clearRect(0, 0, width, height);
                            ctx.fillStyle = "#fff";
                            ctx.fillRect(0, 0, width, height);
                            (0, drawWorld_1.drawLerpWorld)(ctx, grid, cells, snake0, snake1, stack, k / animationOptions.step, drawOptions);
                            encoder.addFrame(ctx);
                        }
                    }
                    outFileName = path_1["default"].join(dir, "out.gif");
                    optimizedFileName = path_1["default"].join(dir, "out.optimized.gif");
                    encoder.finish();
                    fs_1["default"].writeFileSync(outFileName, encoder.out.getData());
                    (0, child_process_1.execFileSync)(gifsicle_1["default"], [
                        //
                        "--optimize=3",
                        "--color-method=diversity",
                        "--colors=18",
                        outFileName,
                        ["--output", optimizedFileName],
                    ].flat());
                    return [2 /*return*/, fs_1["default"].readFileSync(optimizedFileName)];
                });
            }); })];
    });
}); };
exports.createGif = createGif;


/***/ }),

/***/ 6038:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.formatParams = void 0;
var formatParams = function (options) {
    if (options === void 0) { options = {}; }
    var sp = new URLSearchParams();
    var o = __assign({}, options);
    if ("year" in options) {
        o.from = "".concat(options.year, "-01-01");
        o.to = "".concat(options.year, "-12-31");
    }
    for (var _i = 0, _a = ["from", "to"]; _i < _a.length; _i++) {
        var s = _a[_i];
        if (o[s]) {
            var value = o[s];
            if (value >= formatDate(new Date()))
                throw new Error("Cannot get contribution for a date in the future.\nPlease limit your range to the current UTC day.");
            sp.set(s, value);
        }
    }
    return sp.toString();
};
exports.formatParams = formatParams;
var formatDate = function (d) {
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth() + 1;
    var date = d.getUTCDate();
    return [
        year,
        month.toString().padStart(2, "0"),
        date.toString().padStart(2, "0"),
    ].join("-");
};


/***/ }),

/***/ 3775:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getGithubUserContribution = void 0;
var node_fetch_1 = __importDefault(__webpack_require__(2197));
var formatParams_1 = __webpack_require__(6038);
/**
 * get the contribution grid from a github user page
 *
 * use options.from=YYYY-MM-DD options.to=YYYY-MM-DD to get the contribution grid for a specific time range
 * or year=2019 as an alias for from=2019-01-01 to=2019-12-31
 *
 * otherwise return use the time range from today minus one year to today ( as seen in github profile page )
 *
 * @param userName github user name
 * @param options
 *
 * @example
 *  getGithubUserContribution("platane", { from: "2019-01-01", to: "2019-12-31" })
 *  getGithubUserContribution("platane", { year: 2019 })
 *
 */
var getGithubUserContribution = function (userName, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var url, res, resText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "year" in options || "from" in options || "to" in options
                        ? "https://github.com/users/".concat(userName, "/contributions?") +
                            (0, formatParams_1.formatParams)(options)
                        : "https://github.com/".concat(userName);
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url)];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error(res.statusText);
                    return [4 /*yield*/, res.text()];
                case 2:
                    resText = _a.sent();
                    return [2 /*return*/, parseUserPage(resText)];
            }
        });
    });
};
exports.getGithubUserContribution = getGithubUserContribution;
var parseUserPage = function (content) {
    // take roughly the svg block
    var block = content
        .split("class=\"js-calendar-graph-svg\"")[1]
        .split("</svg>")[0];
    var x = 0;
    var lastYAttribute = 0;
    var rects = Array.from(block.matchAll(/<rect[^>]*>/g)).map(function (_a) {
        var m = _a[0];
        var date = m.match(/data-date="([^"]+)"/)[1];
        var count = +m.match(/data-count="([^"]+)"/)[1];
        var level = +m.match(/data-level="([^"]+)"/)[1];
        var yAttribute = +m.match(/y="([^"]+)"/)[1];
        if (lastYAttribute > yAttribute)
            x++;
        lastYAttribute = yAttribute;
        return { date: date, count: count, level: level, x: x, yAttribute: yAttribute };
    });
    var yAttributes = Array.from(new Set(rects.map(function (c) { return c.yAttribute; })).keys()).sort();
    var cells = rects.map(function (_a) {
        var yAttribute = _a.yAttribute, c = __rest(_a, ["yAttribute"]);
        return (__assign({ y: yAttributes.indexOf(yAttribute) }, c));
    });
    return cells;
};


/***/ }),

/***/ 5256:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getTunnellablePoints = exports.clearCleanColoredLayer = void 0;
var grid_1 = __webpack_require__(2881);
var snake_1 = __webpack_require__(9347);
var point_1 = __webpack_require__(3627);
var getBestTunnel_1 = __webpack_require__(9726);
var outside_1 = __webpack_require__(4076);
var clearCleanColoredLayer = function (grid, outside, snake0, color) {
    var snakeN = (0, snake_1.getSnakeLength)(snake0);
    var points = (0, exports.getTunnellablePoints)(grid, outside, snakeN, color);
    var chain = [snake0];
    while (points.length) {
        var path = getPathToNextPoint(grid, chain[0], color, points);
        path.pop();
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var snake = path_1[_i];
            setEmptySafe(grid, (0, snake_1.getHeadX)(snake), (0, snake_1.getHeadY)(snake));
        }
        chain.unshift.apply(chain, path);
    }
    (0, outside_1.fillOutside)(outside, grid);
    chain.pop();
    return chain;
};
exports.clearCleanColoredLayer = clearCleanColoredLayer;
var unwrap = function (m) {
    return !m ? [] : __spreadArray([m.snake], unwrap(m.parent), true);
};
var getPathToNextPoint = function (grid, snake0, color, points) {
    var closeList = [];
    var openList = [{ snake: snake0 }];
    var _loop_1 = function () {
        var o = openList.shift();
        var x = (0, snake_1.getHeadX)(o.snake);
        var y = (0, snake_1.getHeadY)(o.snake);
        var i = points.findIndex(function (p) { return p.x === x && p.y === y; });
        if (i >= 0) {
            points.splice(i, 1);
            return { value: unwrap(o) };
        }
        var _loop_2 = function (dx, dy) {
            if ((0, grid_1.isInsideLarge)(grid, 2, x + dx, y + dy) &&
                !(0, snake_1.snakeWillSelfCollide)(o.snake, dx, dy) &&
                getColorSafe(grid, x + dx, y + dy) <= color) {
                var snake_2 = (0, snake_1.nextSnake)(o.snake, dx, dy);
                if (!closeList.some(function (s0) { return (0, snake_1.snakeEquals)(s0, snake_2); })) {
                    closeList.push(snake_2);
                    openList.push({ snake: snake_2, parent: o });
                }
            }
        };
        for (var _i = 0, around4_1 = point_1.around4; _i < around4_1.length; _i++) {
            var _a = around4_1[_i], dx = _a.x, dy = _a.y;
            _loop_2(dx, dy);
        }
    };
    while (openList.length) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
};
/**
 * get all cells that are tunnellable
 */
var getTunnellablePoints = function (grid, outside, snakeN, color) {
    var points = [];
    var _loop_3 = function (x) {
        var _loop_4 = function (y) {
            var c = (0, grid_1.getColor)(grid, x, y);
            if (!(0, grid_1.isEmpty)(c) &&
                c <= color &&
                !points.some(function (p) { return p.x === x && p.y === y; })) {
                var tunnel = (0, getBestTunnel_1.getBestTunnel)(grid, outside, x, y, color, snakeN);
                if (tunnel)
                    for (var _i = 0, tunnel_1 = tunnel; _i < tunnel_1.length; _i++) {
                        var p = tunnel_1[_i];
                        if (!isEmptySafe(grid, p.x, p.y))
                            points.push(p);
                    }
            }
        };
        for (var y = grid.height; y--;) {
            _loop_4(y);
        }
    };
    for (var x = grid.width; x--;) {
        _loop_3(x);
    }
    return points;
};
exports.getTunnellablePoints = getTunnellablePoints;
var getColorSafe = function (grid, x, y) {
    return (0, grid_1.isInside)(grid, x, y) ? (0, grid_1.getColor)(grid, x, y) : 0;
};
var setEmptySafe = function (grid, x, y) {
    if ((0, grid_1.isInside)(grid, x, y))
        (0, grid_1.setColorEmpty)(grid, x, y);
};
var isEmptySafe = function (grid, x, y) {
    return !(0, grid_1.isInside)(grid, x, y) && (0, grid_1.isEmpty)((0, grid_1.getColor)(grid, x, y));
};


/***/ }),

/***/ 3650:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getPriority = exports.getTunnellablePoints = exports.clearResidualColoredLayer = void 0;
var grid_1 = __webpack_require__(2881);
var snake_1 = __webpack_require__(9347);
var getBestTunnel_1 = __webpack_require__(9726);
var outside_1 = __webpack_require__(4076);
var tunnel_1 = __webpack_require__(7172);
var getPathTo_1 = __webpack_require__(7986);
var clearResidualColoredLayer = function (grid, outside, snake0, color) {
    var snakeN = (0, snake_1.getSnakeLength)(snake0);
    var tunnels = (0, exports.getTunnellablePoints)(grid, outside, snakeN, color);
    // sort
    tunnels.sort(function (a, b) { return b.priority - a.priority; });
    var chain = [snake0];
    while (tunnels.length) {
        // get the best next tunnel
        var t = getNextTunnel(tunnels, chain[0]);
        // goes to the start of the tunnel
        chain.unshift.apply(chain, (0, getPathTo_1.getPathTo)(grid, chain[0], t[0].x, t[0].y));
        // goes to the end of the tunnel
        chain.unshift.apply(chain, (0, tunnel_1.getTunnelPath)(chain[0], t));
        // update grid
        for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
            var _a = t_1[_i], x = _a.x, y = _a.y;
            setEmptySafe(grid, x, y);
        }
        // update outside
        (0, outside_1.fillOutside)(outside, grid);
        // update tunnels
        for (var i = tunnels.length; i--;)
            if ((0, grid_1.isEmpty)((0, grid_1.getColor)(grid, tunnels[i].x, tunnels[i].y)))
                tunnels.splice(i, 1);
            else {
                var t_2 = tunnels[i];
                var tunnel = (0, getBestTunnel_1.getBestTunnel)(grid, outside, t_2.x, t_2.y, color, snakeN);
                if (!tunnel)
                    tunnels.splice(i, 1);
                else {
                    t_2.tunnel = tunnel;
                    t_2.priority = (0, exports.getPriority)(grid, color, tunnel);
                }
            }
        // re-sort
        tunnels.sort(function (a, b) { return b.priority - a.priority; });
    }
    chain.pop();
    return chain;
};
exports.clearResidualColoredLayer = clearResidualColoredLayer;
var getNextTunnel = function (ts, snake) {
    var minDistance = Infinity;
    var closestTunnel = null;
    var x = (0, snake_1.getHeadX)(snake);
    var y = (0, snake_1.getHeadY)(snake);
    var priority = ts[0].priority;
    for (var i = 0; ts[i] && ts[i].priority === priority; i++) {
        var t = ts[i].tunnel;
        var d = distanceSq(t[0].x, t[0].y, x, y);
        if (d < minDistance) {
            minDistance = d;
            closestTunnel = t;
        }
    }
    return closestTunnel;
};
/**
 * get all the tunnels for all the cells accessible
 */
var getTunnellablePoints = function (grid, outside, snakeN, color) {
    var points = [];
    for (var x = grid.width; x--;)
        for (var y = grid.height; y--;) {
            var c = (0, grid_1.getColor)(grid, x, y);
            if (!(0, grid_1.isEmpty)(c) && c < color) {
                var tunnel = (0, getBestTunnel_1.getBestTunnel)(grid, outside, x, y, color, snakeN);
                if (tunnel) {
                    var priority = (0, exports.getPriority)(grid, color, tunnel);
                    points.push({ x: x, y: y, priority: priority, tunnel: tunnel });
                }
            }
        }
    return points;
};
exports.getTunnellablePoints = getTunnellablePoints;
/**
 * get the score of the tunnel
 * prioritize tunnel with maximum color smaller than <color> and with minimum <color>
 * with some tweaks
 */
var getPriority = function (grid, color, tunnel) {
    var nColor = 0;
    var nLess = 0;
    var _loop_1 = function (i) {
        var _a = tunnel[i], x = _a.x, y = _a.y;
        var c = getColorSafe(grid, x, y);
        if (!(0, grid_1.isEmpty)(c) && i === tunnel.findIndex(function (p) { return p.x === x && p.y === y; })) {
            if (c === color)
                nColor += 1;
            else
                nLess += color - c;
        }
    };
    for (var i = 0; i < tunnel.length; i++) {
        _loop_1(i);
    }
    if (nColor === 0)
        return 99999;
    return nLess / nColor;
};
exports.getPriority = getPriority;
var distanceSq = function (ax, ay, bx, by) {
    return Math.pow((ax - bx), 2) + Math.pow((ay - by), 2);
};
var getColorSafe = function (grid, x, y) {
    return (0, grid_1.isInside)(grid, x, y) ? (0, grid_1.getColor)(grid, x, y) : 0;
};
var setEmptySafe = function (grid, x, y) {
    if ((0, grid_1.isInside)(grid, x, y))
        (0, grid_1.setColorEmpty)(grid, x, y);
};


/***/ }),

/***/ 2705:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getBestRoute = void 0;
var grid_1 = __webpack_require__(2881);
var outside_1 = __webpack_require__(4076);
var clearResidualColoredLayer_1 = __webpack_require__(3650);
var clearCleanColoredLayer_1 = __webpack_require__(5256);
var getBestRoute = function (grid0, snake0) {
    var grid = (0, grid_1.copyGrid)(grid0);
    var outside = (0, outside_1.createOutside)(grid);
    var chain = [snake0];
    for (var _i = 0, _a = extractColors(grid); _i < _a.length; _i++) {
        var color = _a[_i];
        if (color > 1)
            chain.unshift.apply(chain, (0, clearResidualColoredLayer_1.clearResidualColoredLayer)(grid, outside, chain[0], color));
        chain.unshift.apply(chain, (0, clearCleanColoredLayer_1.clearCleanColoredLayer)(grid, outside, chain[0], color));
    }
    return chain.reverse();
};
exports.getBestRoute = getBestRoute;
var extractColors = function (grid) {
    // @ts-ignore
    var maxColor = Math.max.apply(Math, grid.data);
    return Array.from({ length: maxColor }, function (_, i) { return (i + 1); });
};


/***/ }),

/***/ 9726:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getBestTunnel = void 0;
var grid_1 = __webpack_require__(2881);
var point_1 = __webpack_require__(3627);
var sortPush_1 = __webpack_require__(3310);
var snake_1 = __webpack_require__(9347);
var outside_1 = __webpack_require__(4076);
var tunnel_1 = __webpack_require__(7172);
var getColorSafe = function (grid, x, y) {
    return (0, grid_1.isInside)(grid, x, y) ? (0, grid_1.getColor)(grid, x, y) : 0;
};
var setEmptySafe = function (grid, x, y) {
    if ((0, grid_1.isInside)(grid, x, y))
        (0, grid_1.setColorEmpty)(grid, x, y);
};
var unwrap = function (m) {
    return !m
        ? []
        : __spreadArray(__spreadArray([], unwrap(m.parent), true), [{ x: (0, snake_1.getHeadX)(m.snake), y: (0, snake_1.getHeadY)(m.snake) }], false);
};
/**
 * returns the path to reach the outside which contains the least color cell
 */
var getSnakeEscapePath = function (grid, outside, snake0, color) {
    var openList = [{ snake: snake0, w: 0 }];
    var closeList = [];
    while (openList[0]) {
        var o = openList.shift();
        var x = (0, snake_1.getHeadX)(o.snake);
        var y = (0, snake_1.getHeadY)(o.snake);
        if ((0, outside_1.isOutside)(outside, x, y))
            return unwrap(o);
        var _loop_1 = function (a) {
            var c = getColorSafe(grid, x + a.x, y + a.y);
            if (c <= color && !(0, snake_1.snakeWillSelfCollide)(o.snake, a.x, a.y)) {
                var snake_2 = (0, snake_1.nextSnake)(o.snake, a.x, a.y);
                if (!closeList.some(function (s0) { return (0, snake_1.snakeEquals)(s0, snake_2); })) {
                    var w = o.w + 1 + +(c === color) * 1000;
                    (0, sortPush_1.sortPush)(openList, { snake: snake_2, w: w, parent: o }, function (a, b) { return a.w - b.w; });
                    closeList.push(snake_2);
                }
            }
        };
        for (var _i = 0, around4_1 = point_1.around4; _i < around4_1.length; _i++) {
            var a = around4_1[_i];
            _loop_1(a);
        }
    }
    return null;
};
/**
 * compute the best tunnel to get to the cell and back to the outside ( best = less usage of <color> )
 *
 * notice that it's one of the best tunnels, more with the same score could exist
 */
var getBestTunnel = function (grid, outside, x, y, color, snakeN) {
    var c = { x: x, y: y };
    var snake0 = (0, snake_1.createSnakeFromCells)(Array.from({ length: snakeN }, function () { return c; }));
    var one = getSnakeEscapePath(grid, outside, snake0, color);
    if (!one)
        return null;
    // get the position of the snake if it was going to leave the x,y cell
    var snakeICells = one.slice(0, snakeN);
    while (snakeICells.length < snakeN)
        snakeICells.push(snakeICells[snakeICells.length - 1]);
    var snakeI = (0, snake_1.createSnakeFromCells)(snakeICells);
    // remove from the grid the colors that one eat
    var gridI = (0, grid_1.copyGrid)(grid);
    for (var _i = 0, one_1 = one; _i < one_1.length; _i++) {
        var _a = one_1[_i], x_1 = _a.x, y_1 = _a.y;
        setEmptySafe(gridI, x_1, y_1);
    }
    var two = getSnakeEscapePath(gridI, outside, snakeI, color);
    if (!two)
        return null;
    one.shift();
    one.reverse();
    one.push.apply(one, two);
    (0, tunnel_1.trimTunnelStart)(grid, one);
    (0, tunnel_1.trimTunnelEnd)(grid, one);
    return one;
};
exports.getBestTunnel = getBestTunnel;


/***/ }),

/***/ 7986:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getPathTo = void 0;
var grid_1 = __webpack_require__(2881);
var point_1 = __webpack_require__(3627);
var snake_1 = __webpack_require__(9347);
var sortPush_1 = __webpack_require__(3310);
/**
 * starting from snake0, get to the cell x,y
 * return the snake chain (reversed)
 */
var getPathTo = function (grid, snake0, x, y) {
    var openList = [{ snake: snake0, w: 0 }];
    var closeList = [];
    while (openList.length) {
        var c = openList.shift();
        var cx = (0, snake_1.getHeadX)(c.snake);
        var cy = (0, snake_1.getHeadY)(c.snake);
        var _loop_1 = function (i) {
            var _a = point_1.around4[i], dx = _a.x, dy = _a.y;
            var nx = cx + dx;
            var ny = cy + dy;
            if (nx === x && ny === y) {
                // unwrap
                var path = [(0, snake_1.nextSnake)(c.snake, dx, dy)];
                var e = c;
                while (e.parent) {
                    path.push(e.snake);
                    e = e.parent;
                }
                return { value: path };
            }
            if ((0, grid_1.isInsideLarge)(grid, 2, nx, ny) &&
                !(0, snake_1.snakeWillSelfCollide)(c.snake, dx, dy) &&
                (!(0, grid_1.isInside)(grid, nx, ny) || (0, grid_1.isEmpty)((0, grid_1.getColor)(grid, nx, ny)))) {
                var nsnake_1 = (0, snake_1.nextSnake)(c.snake, dx, dy);
                if (!closeList.some(function (s) { return (0, snake_1.snakeEquals)(nsnake_1, s); })) {
                    var w = c.w + 1;
                    var h = Math.abs(nx - x) + Math.abs(ny - y);
                    var f = w + h;
                    var o = { snake: nsnake_1, parent: c, w: w, h: h, f: f };
                    (0, sortPush_1.sortPush)(openList, o, function (a, b) { return a.f - b.f; });
                    closeList.push(nsnake_1);
                }
            }
        };
        for (var i = 0; i < point_1.around4.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
};
exports.getPathTo = getPathTo;


/***/ }),

/***/ 6963:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getPathToPose = void 0;
var snake_1 = __webpack_require__(9347);
var grid_1 = __webpack_require__(2881);
var tunnel_1 = __webpack_require__(7172);
var point_1 = __webpack_require__(3627);
var sortPush_1 = __webpack_require__(3310);
var isEmptySafe = function (grid, x, y) {
    return !(0, grid_1.isInside)(grid, x, y) || (0, grid_1.isEmpty)((0, grid_1.getColor)(grid, x, y));
};
var getPathToPose = function (snake0, target, grid) {
    if ((0, snake_1.snakeEquals)(snake0, target))
        return [];
    var targetCells = (0, snake_1.snakeToCells)(target).reverse();
    var snakeN = (0, snake_1.getSnakeLength)(snake0);
    var box = {
        min: {
            x: Math.min((0, snake_1.getHeadX)(snake0), (0, snake_1.getHeadX)(target)) - snakeN - 1,
            y: Math.min((0, snake_1.getHeadY)(snake0), (0, snake_1.getHeadY)(target)) - snakeN - 1
        },
        max: {
            x: Math.max((0, snake_1.getHeadX)(snake0), (0, snake_1.getHeadX)(target)) + snakeN + 1,
            y: Math.max((0, snake_1.getHeadY)(snake0), (0, snake_1.getHeadY)(target)) + snakeN + 1
        }
    };
    var t0 = targetCells[0], forbidden = targetCells.slice(1);
    forbidden.slice(0, 3);
    var openList = [{ snake: snake0, w: 0 }];
    var closeList = [];
    while (openList.length) {
        var o = openList.shift();
        var x = (0, snake_1.getHeadX)(o.snake);
        var y = (0, snake_1.getHeadY)(o.snake);
        if (x === t0.x && y === t0.y) {
            var path = [];
            var e = o;
            while (e) {
                path.push(e.snake);
                e = e.parent;
            }
            path.unshift.apply(path, (0, tunnel_1.getTunnelPath)(path[0], targetCells));
            path.pop();
            path.reverse();
            return path;
        }
        var _loop_1 = function (i) {
            var _a = point_1.around4[i], dx = _a.x, dy = _a.y;
            var nx = x + dx;
            var ny = y + dy;
            if (!(0, snake_1.snakeWillSelfCollide)(o.snake, dx, dy) &&
                (!grid || isEmptySafe(grid, nx, ny)) &&
                (grid
                    ? (0, grid_1.isInsideLarge)(grid, 2, nx, ny)
                    : box.min.x <= nx &&
                        nx <= box.max.x &&
                        box.min.y <= ny &&
                        ny <= box.max.y) &&
                !forbidden.some(function (p) { return p.x === nx && p.y === ny; })) {
                var snake_2 = (0, snake_1.nextSnake)(o.snake, dx, dy);
                if (!closeList.some(function (s) { return (0, snake_1.snakeEquals)(snake_2, s); })) {
                    var w = o.w + 1;
                    var h = Math.abs(nx - x) + Math.abs(ny - y);
                    var f = w + h;
                    (0, sortPush_1.sortPush)(openList, { f: f, w: w, snake: snake_2, parent: o }, function (a, b) { return a.f - b.f; });
                    closeList.push(snake_2);
                }
            }
        };
        for (var i = 0; i < point_1.around4.length; i++) {
            _loop_1(i);
        }
    }
};
exports.getPathToPose = getPathToPose;


/***/ }),

/***/ 4076:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.isOutside = exports.fillOutside = exports.createOutside = void 0;
var grid_1 = __webpack_require__(2881);
var point_1 = __webpack_require__(3627);
var createOutside = function (grid, color) {
    if (color === void 0) { color = 0; }
    var outside = (0, grid_1.createEmptyGrid)(grid.width, grid.height);
    for (var x = outside.width; x--;)
        for (var y = outside.height; y--;)
            (0, grid_1.setColor)(outside, x, y, 1);
    (0, exports.fillOutside)(outside, grid, color);
    return outside;
};
exports.createOutside = createOutside;
var fillOutside = function (outside, grid, color) {
    if (color === void 0) { color = 0; }
    var changed = true;
    while (changed) {
        changed = false;
        var _loop_1 = function (x) {
            var _loop_2 = function (y) {
                if ((0, grid_1.getColor)(grid, x, y) <= color &&
                    !(0, exports.isOutside)(outside, x, y) &&
                    point_1.around4.some(function (a) { return (0, exports.isOutside)(outside, x + a.x, y + a.y); })) {
                    changed = true;
                    (0, grid_1.setColorEmpty)(outside, x, y);
                }
            };
            for (var y = outside.height; y--;) {
                _loop_2(y);
            }
        };
        for (var x = outside.width; x--;) {
            _loop_1(x);
        }
    }
    return outside;
};
exports.fillOutside = fillOutside;
var isOutside = function (outside, x, y) {
    return !(0, grid_1.isInside)(outside, x, y) || (0, grid_1.isEmpty)((0, grid_1.getColor)(outside, x, y));
};
exports.isOutside = isOutside;


/***/ }),

/***/ 1412:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.step = void 0;
var grid_1 = __webpack_require__(2881);
var snake_1 = __webpack_require__(9347);
var step = function (grid, stack, snake) {
    var x = (0, snake_1.getHeadX)(snake);
    var y = (0, snake_1.getHeadY)(snake);
    var color = (0, grid_1.getColor)(grid, x, y);
    if ((0, grid_1.isInside)(grid, x, y) && !(0, grid_1.isEmpty)(color)) {
        stack.push(color);
        (0, grid_1.setColorEmpty)(grid, x, y);
    }
};
exports.step = step;


/***/ }),

/***/ 7172:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.trimTunnelEnd = exports.trimTunnelStart = exports.updateTunnel = exports.getTunnelPath = void 0;
var grid_1 = __webpack_require__(2881);
var snake_1 = __webpack_require__(9347);
/**
 * get the sequence of snake to cross the tunnel
 */
var getTunnelPath = function (snake0, tunnel) {
    var chain = [];
    var snake = snake0;
    for (var i = 1; i < tunnel.length; i++) {
        var dx = tunnel[i].x - (0, snake_1.getHeadX)(snake);
        var dy = tunnel[i].y - (0, snake_1.getHeadY)(snake);
        snake = (0, snake_1.nextSnake)(snake, dx, dy);
        chain.unshift(snake);
    }
    return chain;
};
exports.getTunnelPath = getTunnelPath;
/**
 * assuming the grid change and the colors got deleted, update the tunnel
 */
var updateTunnel = function (grid, tunnel, toDelete) {
    var _loop_1 = function () {
        var _a = tunnel[0], x = _a.x, y = _a.y;
        if (isEmptySafe(grid, x, y) ||
            toDelete.some(function (p) { return p.x === x && p.y === y; })) {
            tunnel.shift();
        }
        else
            return "break";
    };
    while (tunnel.length) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    var _loop_2 = function () {
        var _b = tunnel[tunnel.length - 1], x = _b.x, y = _b.y;
        if (isEmptySafe(grid, x, y) ||
            toDelete.some(function (p) { return p.x === x && p.y === y; })) {
            tunnel.pop();
        }
        else
            return "break";
    };
    while (tunnel.length) {
        var state_2 = _loop_2();
        if (state_2 === "break")
            break;
    }
};
exports.updateTunnel = updateTunnel;
var isEmptySafe = function (grid, x, y) {
    return !(0, grid_1.isInside)(grid, x, y) || (0, grid_1.isEmpty)((0, grid_1.getColor)(grid, x, y));
};
/**
 * remove empty cell from start
 */
var trimTunnelStart = function (grid, tunnel) {
    while (tunnel.length) {
        var _a = tunnel[0], x = _a.x, y = _a.y;
        if (isEmptySafe(grid, x, y))
            tunnel.shift();
        else
            break;
    }
};
exports.trimTunnelStart = trimTunnelStart;
/**
 * remove empty cell from end
 */
var trimTunnelEnd = function (grid, tunnel) {
    var _loop_3 = function () {
        var i = tunnel.length - 1;
        var _a = tunnel[i], x = _a.x, y = _a.y;
        if (isEmptySafe(grid, x, y) ||
            tunnel.findIndex(function (p) { return p.x === x && p.y === y; }) < i)
            tunnel.pop();
        else
            return "break";
    };
    while (tunnel.length) {
        var state_3 = _loop_3();
        if (state_3 === "break")
            break;
    }
};
exports.trimTunnelEnd = trimTunnelEnd;


/***/ }),

/***/ 3310:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.sortPush = void 0;
var sortPush = function (arr, x, sortFn) {
    var a = 0;
    var b = arr.length;
    if (arr.length === 0 || sortFn(x, arr[a]) <= 0) {
        arr.unshift(x);
        return;
    }
    while (b - a > 1) {
        var e_1 = Math.ceil((a + b) / 2);
        var s = sortFn(x, arr[e_1]);
        if (s === 0)
            a = b = e_1;
        else if (s > 0)
            a = e_1;
        else
            b = e_1;
    }
    var e = Math.ceil((a + b) / 2);
    arr.splice(e, 0, x);
};
exports.sortPush = sortPush;


/***/ }),

/***/ 3580:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.createGrid = void 0;
var utils_1 = __webpack_require__(5913);
var percent = function (x) { return (x * 100).toFixed(2); };
var createGrid = function (cells, _a, duration) {
    var sizeDotBorderRadius = _a.sizeDotBorderRadius, sizeDot = _a.sizeDot, sizeCell = _a.sizeCell;
    var svgElements = [];
    var styles = [
        ".c{\n      shape-rendering: geometricPrecision;\n      fill: var(--ce);\n      stroke-width: 1px;\n      stroke: var(--cb);\n      animation: none ".concat(duration, "ms linear infinite;\n    }"),
    ];
    var i = 0;
    for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
        var _b = cells_1[_i], x = _b.x, y = _b.y, color = _b.color, t = _b.t;
        var id = t && "c" + (i++).toString(36);
        var s = sizeCell;
        var d = sizeDot;
        var m = (s - d) / 2;
        if (t !== null) {
            var animationName = id;
            styles.push("@keyframes ".concat(animationName, " {") +
                "".concat(percent(t - 0.0001), "%{fill:var(--c").concat(color, ")}") +
                "".concat(percent(t + 0.0001), "%,100%{fill:var(--ce)}") +
                "}", ".c.".concat(id, "{fill: var(--c").concat(color, "); animation-name: ").concat(animationName, "}"));
        }
        svgElements.push((0, utils_1.h)("rect", {
            "class": ["c", id].filter(Boolean).join(" "),
            x: x * s + m,
            y: y * s + m,
            rx: sizeDotBorderRadius,
            ry: sizeDotBorderRadius,
            width: d,
            height: d
        }));
    }
    return { svgElements: svgElements, styles: styles };
};
exports.createGrid = createGrid;


/***/ }),

/***/ 7415:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createSvg = void 0;
var grid_1 = __webpack_require__(2881);
var snake_1 = __webpack_require__(9347);
var snake_2 = __webpack_require__(8243);
var grid_2 = __webpack_require__(3580);
var stack_1 = __webpack_require__(7466);
var utils_1 = __webpack_require__(5913);
var csso = __importStar(__webpack_require__(1830));
var getCellsFromGrid = function (_a) {
    var width = _a.width, height = _a.height;
    return Array.from({ length: width }, function (_, x) {
        return Array.from({ length: height }, function (_, y) { return ({ x: x, y: y }); });
    }).flat();
};
var createLivingCells = function (grid0, chain, cells) {
    var livingCells = (cells !== null && cells !== void 0 ? cells : getCellsFromGrid(grid0)).map(function (_a) {
        var x = _a.x, y = _a.y;
        return ({
            x: x,
            y: y,
            t: null,
            color: (0, grid_1.getColor)(grid0, x, y)
        });
    });
    var grid = (0, grid_1.copyGrid)(grid0);
    var _loop_1 = function (i) {
        var snake = chain[i];
        var x = (0, snake_1.getHeadX)(snake);
        var y = (0, snake_1.getHeadY)(snake);
        if ((0, grid_1.isInside)(grid, x, y) && !(0, grid_1.isEmpty)((0, grid_1.getColor)(grid, x, y))) {
            (0, grid_1.setColorEmpty)(grid, x, y);
            var cell = livingCells.find(function (c) { return c.x === x && c.y === y; });
            cell.t = i / chain.length;
        }
    };
    for (var i = 0; i < chain.length; i++) {
        _loop_1(i);
    }
    return livingCells;
};
var createSvg = function (grid, cells, chain, drawOptions, animationOptions) {
    var width = (grid.width + 2) * drawOptions.sizeCell;
    var height = (grid.height + 5) * drawOptions.sizeCell;
    var duration = animationOptions.frameDuration * chain.length;
    var livingCells = createLivingCells(grid, chain, cells);
    var elements = [
        (0, grid_2.createGrid)(livingCells, drawOptions, duration),
        (0, stack_1.createStack)(livingCells, drawOptions, grid.width * drawOptions.sizeCell, (grid.height + 2) * drawOptions.sizeCell, duration),
        (0, snake_2.createSnake)(chain, drawOptions, duration),
    ];
    var viewBox = [
        -drawOptions.sizeCell,
        -drawOptions.sizeCell * 2,
        width,
        height,
    ].join(" ");
    var style = generateColorVar(drawOptions) +
        elements
            .map(function (e) { return e.styles; })
            .flat()
            .join("\n");
    var svg = __spreadArray(__spreadArray([
        (0, utils_1.h)("svg", {
            viewBox: viewBox,
            width: width,
            height: height,
            xmlns: "http://www.w3.org/2000/svg"
        }).replace("/>", ">"),
        "<desc>",
        "Generated with https://github.com/Platane/snk",
        "</desc>",
        "<style>",
        optimizeCss(style),
        "</style>"
    ], elements.map(function (e) { return e.svgElements; }).flat(), true), [
        "</svg>",
    ], false).join("");
    return optimizeSvg(svg);
};
exports.createSvg = createSvg;
var optimizeCss = function (css) { return csso.minify(css).css; };
var optimizeSvg = function (svg) { return svg; };
var generateColorVar = function (drawOptions) {
    return "\n    :root {\n    --cb: ".concat(drawOptions.colorDotBorder, ";\n    --cs: ").concat(drawOptions.colorSnake, ";\n    --ce: ").concat(drawOptions.colorEmpty, ";\n    ").concat(Object.entries(drawOptions.colorDots)
        .map(function (_a) {
        var i = _a[0], color = _a[1];
        return "--c".concat(i, ":").concat(color, ";");
    })
        .join(""), "\n    }\n    ") +
        (drawOptions.dark
            ? "\n    @media (prefers-color-scheme: dark) {\n      :root {\n        --cb: ".concat(drawOptions.dark.colorDotBorder || drawOptions.colorDotBorder, ";\n        --cs: ").concat(drawOptions.dark.colorSnake || drawOptions.colorSnake, ";\n        --ce: ").concat(drawOptions.dark.colorEmpty, ";\n        ").concat(Object.entries(drawOptions.dark.colorDots)
                .map(function (_a) {
                var i = _a[0], color = _a[1];
                return "--c".concat(i, ":").concat(color, ";");
            })
                .join(""), "\n      }\n    }\n")
            : "");
};


/***/ }),

/***/ 8243:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createSnake = void 0;
var snake_1 = __webpack_require__(9347);
var utils_1 = __webpack_require__(5913);
var percent = function (x) { return (x * 100).toFixed(2); };
var lerp = function (k, a, b) { return (1 - k) * a + k * b; };
var createSnake = function (chain, _a, duration) {
    var sizeCell = _a.sizeCell, sizeDot = _a.sizeDot;
    var snakeN = chain[0] ? (0, snake_1.getSnakeLength)(chain[0]) : 0;
    var snakeParts = Array.from({ length: snakeN }, function () { return []; });
    for (var _i = 0, chain_1 = chain; _i < chain_1.length; _i++) {
        var snake = chain_1[_i];
        var cells = (0, snake_1.snakeToCells)(snake);
        for (var i = cells.length; i--;)
            snakeParts[i].push(cells[i]);
    }
    var svgElements = snakeParts.map(function (_, i, _a) {
        var length = _a.length;
        // compute snake part size
        var dMin = sizeDot * 0.8;
        var dMax = sizeCell * 0.9;
        var iMax = Math.min(4, length);
        var u = Math.pow((1 - Math.min(i, iMax) / iMax), 2);
        var s = lerp(u, dMin, dMax);
        var m = (sizeCell - s) / 2;
        var r = Math.min(4.5, (4 * s) / sizeDot);
        return (0, utils_1.h)("rect", {
            "class": "s s".concat(i),
            x: m.toFixed(1),
            y: m.toFixed(1),
            width: s.toFixed(1),
            height: s.toFixed(1),
            rx: r.toFixed(1),
            ry: r.toFixed(1)
        });
    });
    var transform = function (_a) {
        var x = _a.x, y = _a.y;
        return "transform:translate(".concat(x * sizeCell, "px,").concat(y * sizeCell, "px)");
    };
    var styles = __spreadArray([
        ".s{ \n      shape-rendering:geometricPrecision;\n      fill:var(--cs);\n      animation: none linear ".concat(duration, "ms infinite\n    }")
    ], snakeParts.map(function (positions, i) {
        var id = "s".concat(i);
        var animationName = id;
        return [
            "@keyframes ".concat(animationName, " {") +
                removeInterpolatedPositions(positions.map(function (tr, i, _a) {
                    var length = _a.length;
                    return (__assign(__assign({}, tr), { t: i / length }));
                }))
                    .map(function (p) { return "".concat(percent(p.t), "%{").concat(transform(p), "}"); })
                    .join("") +
                "}",
            ".s.".concat(id, "{").concat(transform(positions[0]), ";animation-name: ").concat(animationName, "}"),
        ];
    }), true).flat();
    return { svgElements: svgElements, styles: styles };
};
exports.createSnake = createSnake;
var removeInterpolatedPositions = function (arr) {
    return arr.filter(function (u, i, arr) {
        if (i - 1 < 0 || i + 1 >= arr.length)
            return true;
        var a = arr[i - 1];
        var b = arr[i + 1];
        var ex = (a.x + b.x) / 2;
        var ey = (a.y + b.y) / 2;
        // return true;
        return !(Math.abs(ex - u.x) < 0.01 && Math.abs(ey - u.y) < 0.01);
    });
};


/***/ }),

/***/ 7466:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createStack = void 0;
var utils_1 = __webpack_require__(5913);
var percent = function (x) { return (x * 100).toFixed(2); };
var createStack = function (cells, _a, width, y, duration) {
    var sizeDot = _a.sizeDot;
    var svgElements = [];
    var styles = [
        ".u{ \n      transform-origin: 0 0;\n      transform: scale(0,1);\n      animation: none linear ".concat(duration, "ms infinite;\n    }"),
    ];
    var stack = cells
        .slice()
        .filter(function (a) { return a.t !== null; })
        .sort(function (a, b) { return a.t - b.t; });
    var blocks = [];
    stack.forEach(function (_a) {
        var color = _a.color, t = _a.t;
        var latest = blocks[blocks.length - 1];
        if ((latest === null || latest === void 0 ? void 0 : latest.color) === color)
            latest.ts.push(t);
        else
            blocks.push({ color: color, ts: [t] });
    });
    var m = width / stack.length;
    var i = 0;
    var nx = 0;
    for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
        var _b = blocks_1[_i], color = _b.color, ts = _b.ts;
        var id = "u" + (i++).toString(36);
        var animationName = id;
        var x = (nx * m).toFixed(1);
        nx += ts.length;
        svgElements.push((0, utils_1.h)("rect", {
            "class": "u ".concat(id),
            height: sizeDot,
            width: (ts.length * m + 0.6).toFixed(1),
            x: x,
            y: y
        }));
        styles.push("@keyframes ".concat(animationName, " {") +
            __spreadArray(__spreadArray([], ts.map(function (t, i, _a) {
                var length = _a.length;
                return [
                    { scale: i / length, t: t - 0.0001 },
                    { scale: (i + 1) / length, t: t + 0.0001 },
                ];
            }), true), [
                [{ scale: 1, t: 1 }],
            ], false).flat()
                .map(function (_a) {
                var scale = _a.scale, t = _a.t;
                return "".concat(percent(t), "%{transform:scale(").concat(scale.toFixed(2), ",1)}");
            })
                .join("\n") +
            "}", ".u.".concat(id, "{fill:var(--c").concat(color, ");animation-name:").concat(animationName, ";transform-origin:").concat(x, "px 0}"));
    }
    return { svgElements: svgElements, styles: styles };
};
exports.createStack = createStack;


/***/ }),

/***/ 5913:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.toAttribute = exports.h = void 0;
var h = function (element, attributes) {
    return "<".concat(element, " ").concat((0, exports.toAttribute)(attributes), "/>");
};
exports.h = h;
var toAttribute = function (o) {
    return Object.entries(o)
        .filter(function (_a) {
        var value = _a[1];
        return value !== null;
    })
        .map(function (_a) {
        var name = _a[0], value = _a[1];
        return "".concat(name, "=\"").concat(value, "\"");
    })
        .join(" ");
};
exports.toAttribute = toAttribute;


/***/ }),

/***/ 7087:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.snake9 = exports.snake5 = exports.snake4 = exports.snake3 = exports.snake1 = void 0;
var snake_1 = __webpack_require__(9347);
var create = function (length) {
    return (0, snake_1.createSnakeFromCells)(Array.from({ length: length }, function (_, i) { return ({ x: i, y: -1 }); }));
};
exports.snake1 = create(1);
exports.snake3 = create(3);
exports.snake4 = create(4);
exports.snake5 = create(5);
exports.snake9 = create(9);


/***/ }),

/***/ 2881:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.createEmptyGrid = exports.gridEquals = exports.isGridEmpty = exports.setColorEmpty = exports.setColor = exports.isEmpty = exports.getColor = exports.copyGrid = exports.isInsideLarge = exports.isInside = void 0;
var isInside = function (grid, x, y) {
    return x >= 0 && y >= 0 && x < grid.width && y < grid.height;
};
exports.isInside = isInside;
var isInsideLarge = function (grid, m, x, y) {
    return x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;
};
exports.isInsideLarge = isInsideLarge;
var copyGrid = function (_a) {
    var width = _a.width, height = _a.height, data = _a.data;
    return ({
        width: width,
        height: height,
        data: Uint8Array.from(data)
    });
};
exports.copyGrid = copyGrid;
var getIndex = function (grid, x, y) { return x * grid.height + y; };
var getColor = function (grid, x, y) {
    return grid.data[getIndex(grid, x, y)];
};
exports.getColor = getColor;
var isEmpty = function (color) { return color === 0; };
exports.isEmpty = isEmpty;
var setColor = function (grid, x, y, color) {
    grid.data[getIndex(grid, x, y)] = color || 0;
};
exports.setColor = setColor;
var setColorEmpty = function (grid, x, y) {
    (0, exports.setColor)(grid, x, y, 0);
};
exports.setColorEmpty = setColorEmpty;
/**
 * return true if the grid is empty
 */
var isGridEmpty = function (grid) { return grid.data.every(function (x) { return x === 0; }); };
exports.isGridEmpty = isGridEmpty;
var gridEquals = function (a, b) {
    return a.data.every(function (_, i) { return a.data[i] === b.data[i]; });
};
exports.gridEquals = gridEquals;
var createEmptyGrid = function (width, height) { return ({
    width: width,
    height: height,
    data: new Uint8Array(width * height)
}); };
exports.createEmptyGrid = createEmptyGrid;


/***/ }),

/***/ 3627:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.pointEquals = exports.around4 = void 0;
exports.around4 = [
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
];
var pointEquals = function (a, b) { return a.x === b.x && a.y === b.y; };
exports.pointEquals = pointEquals;


/***/ }),

/***/ 9347:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.createSnakeFromCells = exports.snakeToCells = exports.snakeWillSelfCollide = exports.nextSnake = exports.snakeEquals = exports.copySnake = exports.getSnakeLength = exports.getHeadY = exports.getHeadX = void 0;
var getHeadX = function (snake) { return snake[0] - 2; };
exports.getHeadX = getHeadX;
var getHeadY = function (snake) { return snake[1] - 2; };
exports.getHeadY = getHeadY;
var getSnakeLength = function (snake) { return snake.length / 2; };
exports.getSnakeLength = getSnakeLength;
var copySnake = function (snake) { return snake.slice(); };
exports.copySnake = copySnake;
var snakeEquals = function (a, b) {
    for (var i = 0; i < a.length; i++)
        if (a[i] !== b[i])
            return false;
    return true;
};
exports.snakeEquals = snakeEquals;
/**
 * return a copy of the next snake, considering that dx, dy is the direction
 */
var nextSnake = function (snake, dx, dy) {
    var copy = new Uint8Array(snake.length);
    for (var i = 2; i < snake.length; i++)
        copy[i] = snake[i - 2];
    copy[0] = snake[0] + dx;
    copy[1] = snake[1] + dy;
    return copy;
};
exports.nextSnake = nextSnake;
/**
 * return true if the next snake will collide with itself
 */
var snakeWillSelfCollide = function (snake, dx, dy) {
    var nx = snake[0] + dx;
    var ny = snake[1] + dy;
    for (var i = 2; i < snake.length - 2; i += 2)
        if (snake[i + 0] === nx && snake[i + 1] === ny)
            return true;
    return false;
};
exports.snakeWillSelfCollide = snakeWillSelfCollide;
var snakeToCells = function (snake) {
    return Array.from({ length: snake.length / 2 }, function (_, i) { return ({
        x: snake[i * 2 + 0] - 2,
        y: snake[i * 2 + 1] - 2
    }); });
};
exports.snakeToCells = snakeToCells;
var createSnakeFromCells = function (points) {
    var snake = new Uint8Array(points.length * 2);
    for (var i = points.length; i--;) {
        snake[i * 2 + 0] = points[i].x + 2;
        snake[i * 2 + 1] = points[i].y + 2;
    }
    return snake;
};
exports.createSnakeFromCells = createSnakeFromCells;


/***/ }),

/***/ 9609:
/***/ ((module) => {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 8348:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const List = __webpack_require__(2080);

function createConvertor(walk) {
    return {
        fromPlainObject: function(ast) {
            walk(ast, {
                enter: function(node) {
                    if (node.children && node.children instanceof List.List === false) {
                        node.children = new List.List().fromArray(node.children);
                    }
                }
            });

            return ast;
        },
        toPlainObject: function(ast) {
            walk(ast, {
                leave: function(node) {
                    if (node.children && node.children instanceof List.List) {
                        node.children = node.children.toArray();
                    }
                }
            });

            return ast;
        }
    };
}

exports.createConvertor = createConvertor;


/***/ }),

/***/ 8237:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const patch = __webpack_require__(8663);

module.exports = patch;


/***/ }),

/***/ 4743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const dataPatch = __webpack_require__(8237);

const mdnAtrules = __webpack_require__(658);
const mdnProperties = __webpack_require__(9149);
const mdnSyntaxes = __webpack_require__(2368);

const extendSyntax = /^\s*\|\s*/;

function preprocessAtrules(dict) {
    const result = Object.create(null);

    for (const atruleName in dict) {
        const atrule = dict[atruleName];
        let descriptors = null;

        if (atrule.descriptors) {
            descriptors = Object.create(null);

            for (const descriptor in atrule.descriptors) {
                descriptors[descriptor] = atrule.descriptors[descriptor].syntax;
            }
        }

        result[atruleName.substr(1)] = {
            prelude: atrule.syntax.trim().match(/^@\S+\s+([^;\{]*)/)[1].trim() || null,
            descriptors
        };
    }

    return result;
}

function patchDictionary(dict, patchDict) {
    const result = {};

    // copy all syntaxes for an original dict
    for (const key in dict) {
        result[key] = dict[key].syntax || dict[key];
    }

    // apply a patch
    for (const key in patchDict) {
        if (key in dict) {
            if (patchDict[key].syntax) {
                result[key] = extendSyntax.test(patchDict[key].syntax)
                    ? result[key] + ' ' + patchDict[key].syntax.trim()
                    : patchDict[key].syntax;
            } else {
                delete result[key];
            }
        } else {
            if (patchDict[key].syntax) {
                result[key] = patchDict[key].syntax.replace(extendSyntax, '');
            }
        }
    }

    return result;
}

function patchAtrules(dict, patchDict) {
    const result = {};

    // copy all syntaxes for an original dict
    for (const key in dict) {
        const patchDescriptors = (patchDict[key] && patchDict[key].descriptors) || null;

        result[key] = {
            prelude: key in patchDict && 'prelude' in patchDict[key]
                ? patchDict[key].prelude
                : dict[key].prelude || null,
            descriptors: patchDictionary(dict[key].descriptors || {}, patchDescriptors || {})
        };
    }

    // apply a patch
    for (const key in patchDict) {
        if (!hasOwnProperty.call(dict, key)) {
            result[key] = {
                prelude: patchDict[key].prelude || null,
                descriptors: patchDict[key].descriptors && patchDictionary({}, patchDict[key].descriptors)
            };
        }
    }

    return result;
}

const definitions = {
    types: patchDictionary(mdnSyntaxes, dataPatch.syntaxes),
    atrules: patchAtrules(preprocessAtrules(mdnAtrules), dataPatch.atrules),
    properties: patchDictionary(mdnProperties, dataPatch.properties)
};

module.exports = definitions;


/***/ }),

/***/ 3921:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const createCustomError = __webpack_require__(7324);

function SyntaxError(message, input, offset) {
    return Object.assign(createCustomError.createCustomError('SyntaxError', message), {
        input,
        offset,
        rawMessage: message,
        message: message + '\n' +
            '  ' + input + '\n' +
            '--' + new Array((offset || input.length) + 1).join('-') + '^'
    });
}

exports.SyntaxError = SyntaxError;


/***/ }),

/***/ 9931:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function noop(value) {
    return value;
}

function generateMultiplier(multiplier) {
    const { min, max, comma } = multiplier;

    if (min === 0 && max === 0) {
        return '*';
    }

    if (min === 0 && max === 1) {
        return '?';
    }

    if (min === 1 && max === 0) {
        return comma ? '#' : '+';
    }

    if (min === 1 && max === 1) {
        return '';
    }

    return (
        (comma ? '#' : '') +
        (min === max
            ? '{' + min + '}'
            : '{' + min + ',' + (max !== 0 ? max : '') + '}'
        )
    );
}

function generateTypeOpts(node) {
    switch (node.type) {
        case 'Range':
            return (
                ' [' +
                (node.min === null ? '-∞' : node.min) +
                ',' +
                (node.max === null ? '∞' : node.max) +
                ']'
            );

        default:
            throw new Error('Unknown node type `' + node.type + '`');
    }
}

function generateSequence(node, decorate, forceBraces, compact) {
    const combinator = node.combinator === ' ' || compact ? node.combinator : ' ' + node.combinator + ' ';
    const result = node.terms
        .map(term => internalGenerate(term, decorate, forceBraces, compact))
        .join(combinator);

    if (node.explicit || forceBraces) {
        return (compact || result[0] === ',' ? '[' : '[ ') + result + (compact ? ']' : ' ]');
    }

    return result;
}

function internalGenerate(node, decorate, forceBraces, compact) {
    let result;

    switch (node.type) {
        case 'Group':
            result =
                generateSequence(node, decorate, forceBraces, compact) +
                (node.disallowEmpty ? '!' : '');
            break;

        case 'Multiplier':
            // return since node is a composition
            return (
                internalGenerate(node.term, decorate, forceBraces, compact) +
                decorate(generateMultiplier(node), node)
            );

        case 'Type':
            result = '<' + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : '') + '>';
            break;

        case 'Property':
            result = '<\'' + node.name + '\'>';
            break;

        case 'Keyword':
            result = node.name;
            break;

        case 'AtKeyword':
            result = '@' + node.name;
            break;

        case 'Function':
            result = node.name + '(';
            break;

        case 'String':
        case 'Token':
            result = node.value;
            break;

        case 'Comma':
            result = ',';
            break;

        default:
            throw new Error('Unknown node type `' + node.type + '`');
    }

    return decorate(result, node);
}

function generate(node, options) {
    let decorate = noop;
    let forceBraces = false;
    let compact = false;

    if (typeof options === 'function') {
        decorate = options;
    } else if (options) {
        forceBraces = Boolean(options.forceBraces);
        compact = Boolean(options.compact);
        if (typeof options.decorate === 'function') {
            decorate = options.decorate;
        }
    }

    return internalGenerate(node, decorate, forceBraces, compact);
}

exports.generate = generate;


/***/ }),

/***/ 7:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const _SyntaxError = __webpack_require__(3921);
const generate = __webpack_require__(9931);
const parse = __webpack_require__(8544);
const walk = __webpack_require__(2388);



exports.SyntaxError = _SyntaxError.SyntaxError;
exports.generate = generate.generate;
exports.parse = parse.parse;
exports.walk = walk.walk;


/***/ }),

/***/ 8544:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const tokenizer = __webpack_require__(1627);

const TAB = 9;
const N = 10;
const F = 12;
const R = 13;
const SPACE = 32;
const EXCLAMATIONMARK = 33;    // !
const NUMBERSIGN = 35;         // #
const AMPERSAND = 38;          // &
const APOSTROPHE = 39;         // '
const LEFTPARENTHESIS = 40;    // (
const RIGHTPARENTHESIS = 41;   // )
const ASTERISK = 42;           // *
const PLUSSIGN = 43;           // +
const COMMA = 44;              // ,
const HYPERMINUS = 45;         // -
const LESSTHANSIGN = 60;       // <
const GREATERTHANSIGN = 62;    // >
const QUESTIONMARK = 63;       // ?
const COMMERCIALAT = 64;       // @
const LEFTSQUAREBRACKET = 91;  // [
const RIGHTSQUAREBRACKET = 93; // ]
const LEFTCURLYBRACKET = 123;  // {
const VERTICALLINE = 124;      // |
const RIGHTCURLYBRACKET = 125; // }
const INFINITY = 8734;         // ∞
const NAME_CHAR = new Uint8Array(128).map((_, idx) =>
    /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0
);
const COMBINATOR_PRECEDENCE = {
    ' ': 1,
    '&&': 2,
    '||': 3,
    '|': 4
};

function scanSpaces(tokenizer) {
    return tokenizer.substringToPos(
        tokenizer.findWsEnd(tokenizer.pos)
    );
}

function scanWord(tokenizer) {
    let end = tokenizer.pos;

    for (; end < tokenizer.str.length; end++) {
        const code = tokenizer.str.charCodeAt(end);
        if (code >= 128 || NAME_CHAR[code] === 0) {
            break;
        }
    }

    if (tokenizer.pos === end) {
        tokenizer.error('Expect a keyword');
    }

    return tokenizer.substringToPos(end);
}

function scanNumber(tokenizer) {
    let end = tokenizer.pos;

    for (; end < tokenizer.str.length; end++) {
        const code = tokenizer.str.charCodeAt(end);
        if (code < 48 || code > 57) {
            break;
        }
    }

    if (tokenizer.pos === end) {
        tokenizer.error('Expect a number');
    }

    return tokenizer.substringToPos(end);
}

function scanString(tokenizer) {
    const end = tokenizer.str.indexOf('\'', tokenizer.pos + 1);

    if (end === -1) {
        tokenizer.pos = tokenizer.str.length;
        tokenizer.error('Expect an apostrophe');
    }

    return tokenizer.substringToPos(end + 1);
}

function readMultiplierRange(tokenizer) {
    let min = null;
    let max = null;

    tokenizer.eat(LEFTCURLYBRACKET);

    min = scanNumber(tokenizer);

    if (tokenizer.charCode() === COMMA) {
        tokenizer.pos++;
        if (tokenizer.charCode() !== RIGHTCURLYBRACKET) {
            max = scanNumber(tokenizer);
        }
    } else {
        max = min;
    }

    tokenizer.eat(RIGHTCURLYBRACKET);

    return {
        min: Number(min),
        max: max ? Number(max) : 0
    };
}

function readMultiplier(tokenizer) {
    let range = null;
    let comma = false;

    switch (tokenizer.charCode()) {
        case ASTERISK:
            tokenizer.pos++;

            range = {
                min: 0,
                max: 0
            };

            break;

        case PLUSSIGN:
            tokenizer.pos++;

            range = {
                min: 1,
                max: 0
            };

            break;

        case QUESTIONMARK:
            tokenizer.pos++;

            range = {
                min: 0,
                max: 1
            };

            break;

        case NUMBERSIGN:
            tokenizer.pos++;

            comma = true;

            if (tokenizer.charCode() === LEFTCURLYBRACKET) {
                range = readMultiplierRange(tokenizer);
            } else {
                range = {
                    min: 1,
                    max: 0
                };
            }

            break;

        case LEFTCURLYBRACKET:
            range = readMultiplierRange(tokenizer);
            break;

        default:
            return null;
    }

    return {
        type: 'Multiplier',
        comma,
        min: range.min,
        max: range.max,
        term: null
    };
}

function maybeMultiplied(tokenizer, node) {
    const multiplier = readMultiplier(tokenizer);

    if (multiplier !== null) {
        multiplier.term = node;
        return multiplier;
    }

    return node;
}

function maybeToken(tokenizer) {
    const ch = tokenizer.peek();

    if (ch === '') {
        return null;
    }

    return {
        type: 'Token',
        value: ch
    };
}

function readProperty(tokenizer) {
    let name;

    tokenizer.eat(LESSTHANSIGN);
    tokenizer.eat(APOSTROPHE);

    name = scanWord(tokenizer);

    tokenizer.eat(APOSTROPHE);
    tokenizer.eat(GREATERTHANSIGN);

    return maybeMultiplied(tokenizer, {
        type: 'Property',
        name
    });
}

// https://drafts.csswg.org/css-values-3/#numeric-ranges
// 4.1. Range Restrictions and Range Definition Notation
//
// Range restrictions can be annotated in the numeric type notation using CSS bracketed
// range notation—[min,max]—within the angle brackets, after the identifying keyword,
// indicating a closed range between (and including) min and max.
// For example, <integer [0, 10]> indicates an integer between 0 and 10, inclusive.
function readTypeRange(tokenizer) {
    // use null for Infinity to make AST format JSON serializable/deserializable
    let min = null; // -Infinity
    let max = null; // Infinity
    let sign = 1;

    tokenizer.eat(LEFTSQUAREBRACKET);

    if (tokenizer.charCode() === HYPERMINUS) {
        tokenizer.peek();
        sign = -1;
    }

    if (sign == -1 && tokenizer.charCode() === INFINITY) {
        tokenizer.peek();
    } else {
        min = sign * Number(scanNumber(tokenizer));
    }

    scanSpaces(tokenizer);
    tokenizer.eat(COMMA);
    scanSpaces(tokenizer);

    if (tokenizer.charCode() === INFINITY) {
        tokenizer.peek();
    } else {
        sign = 1;

        if (tokenizer.charCode() === HYPERMINUS) {
            tokenizer.peek();
            sign = -1;
        }

        max = sign * Number(scanNumber(tokenizer));
    }

    tokenizer.eat(RIGHTSQUAREBRACKET);

    // If no range is indicated, either by using the bracketed range notation
    // or in the property description, then [−∞,∞] is assumed.
    if (min === null && max === null) {
        return null;
    }

    return {
        type: 'Range',
        min,
        max
    };
}

function readType(tokenizer) {
    let name;
    let opts = null;

    tokenizer.eat(LESSTHANSIGN);
    name = scanWord(tokenizer);

    if (tokenizer.charCode() === LEFTPARENTHESIS &&
        tokenizer.nextCharCode() === RIGHTPARENTHESIS) {
        tokenizer.pos += 2;
        name += '()';
    }

    if (tokenizer.charCodeAt(tokenizer.findWsEnd(tokenizer.pos)) === LEFTSQUAREBRACKET) {
        scanSpaces(tokenizer);
        opts = readTypeRange(tokenizer);
    }

    tokenizer.eat(GREATERTHANSIGN);

    return maybeMultiplied(tokenizer, {
        type: 'Type',
        name,
        opts
    });
}

function readKeywordOrFunction(tokenizer) {
    const name = scanWord(tokenizer);

    if (tokenizer.charCode() === LEFTPARENTHESIS) {
        tokenizer.pos++;

        return {
            type: 'Function',
            name
        };
    }

    return maybeMultiplied(tokenizer, {
        type: 'Keyword',
        name
    });
}

function regroupTerms(terms, combinators) {
    function createGroup(terms, combinator) {
        return {
            type: 'Group',
            terms,
            combinator,
            disallowEmpty: false,
            explicit: false
        };
    }

    let combinator;

    combinators = Object.keys(combinators)
        .sort((a, b) => COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b]);

    while (combinators.length > 0) {
        combinator = combinators.shift();

        let i = 0;
        let subgroupStart = 0;

        for (; i < terms.length; i++) {
            const term = terms[i];

            if (term.type === 'Combinator') {
                if (term.value === combinator) {
                    if (subgroupStart === -1) {
                        subgroupStart = i - 1;
                    }
                    terms.splice(i, 1);
                    i--;
                } else {
                    if (subgroupStart !== -1 && i - subgroupStart > 1) {
                        terms.splice(
                            subgroupStart,
                            i - subgroupStart,
                            createGroup(terms.slice(subgroupStart, i), combinator)
                        );
                        i = subgroupStart + 1;
                    }
                    subgroupStart = -1;
                }
            }
        }

        if (subgroupStart !== -1 && combinators.length) {
            terms.splice(
                subgroupStart,
                i - subgroupStart,
                createGroup(terms.slice(subgroupStart, i), combinator)
            );
        }
    }

    return combinator;
}

function readImplicitGroup(tokenizer) {
    const terms = [];
    const combinators = {};
    let token;
    let prevToken = null;
    let prevTokenPos = tokenizer.pos;

    while (token = peek(tokenizer)) {
        if (token.type !== 'Spaces') {
            if (token.type === 'Combinator') {
                // check for combinator in group beginning and double combinator sequence
                if (prevToken === null || prevToken.type === 'Combinator') {
                    tokenizer.pos = prevTokenPos;
                    tokenizer.error('Unexpected combinator');
                }

                combinators[token.value] = true;
            } else if (prevToken !== null && prevToken.type !== 'Combinator') {
                combinators[' '] = true;  // a b
                terms.push({
                    type: 'Combinator',
                    value: ' '
                });
            }

            terms.push(token);
            prevToken = token;
            prevTokenPos = tokenizer.pos;
        }
    }

    // check for combinator in group ending
    if (prevToken !== null && prevToken.type === 'Combinator') {
        tokenizer.pos -= prevTokenPos;
        tokenizer.error('Unexpected combinator');
    }

    return {
        type: 'Group',
        terms,
        combinator: regroupTerms(terms, combinators) || ' ',
        disallowEmpty: false,
        explicit: false
    };
}

function readGroup(tokenizer) {
    let result;

    tokenizer.eat(LEFTSQUAREBRACKET);
    result = readImplicitGroup(tokenizer);
    tokenizer.eat(RIGHTSQUAREBRACKET);

    result.explicit = true;

    if (tokenizer.charCode() === EXCLAMATIONMARK) {
        tokenizer.pos++;
        result.disallowEmpty = true;
    }

    return result;
}

function peek(tokenizer) {
    let code = tokenizer.charCode();

    if (code < 128 && NAME_CHAR[code] === 1) {
        return readKeywordOrFunction(tokenizer);
    }

    switch (code) {
        case RIGHTSQUAREBRACKET:
            // don't eat, stop scan a group
            break;

        case LEFTSQUAREBRACKET:
            return maybeMultiplied(tokenizer, readGroup(tokenizer));

        case LESSTHANSIGN:
            return tokenizer.nextCharCode() === APOSTROPHE
                ? readProperty(tokenizer)
                : readType(tokenizer);

        case VERTICALLINE:
            return {
                type: 'Combinator',
                value: tokenizer.substringToPos(
                    tokenizer.pos + (tokenizer.nextCharCode() === VERTICALLINE ? 2 : 1)
                )
            };

        case AMPERSAND:
            tokenizer.pos++;
            tokenizer.eat(AMPERSAND);

            return {
                type: 'Combinator',
                value: '&&'
            };

        case COMMA:
            tokenizer.pos++;
            return {
                type: 'Comma'
            };

        case APOSTROPHE:
            return maybeMultiplied(tokenizer, {
                type: 'String',
                value: scanString(tokenizer)
            });

        case SPACE:
        case TAB:
        case N:
        case R:
        case F:
            return {
                type: 'Spaces',
                value: scanSpaces(tokenizer)
            };

        case COMMERCIALAT:
            code = tokenizer.nextCharCode();

            if (code < 128 && NAME_CHAR[code] === 1) {
                tokenizer.pos++;
                return {
                    type: 'AtKeyword',
                    name: scanWord(tokenizer)
                };
            }

            return maybeToken(tokenizer);

        case ASTERISK:
        case PLUSSIGN:
        case QUESTIONMARK:
        case NUMBERSIGN:
        case EXCLAMATIONMARK:
            // prohibited tokens (used as a multiplier start)
            break;

        case LEFTCURLYBRACKET:
            // LEFTCURLYBRACKET is allowed since mdn/data uses it w/o quoting
            // check next char isn't a number, because it's likely a disjoined multiplier
            code = tokenizer.nextCharCode();

            if (code < 48 || code > 57) {
                return maybeToken(tokenizer);
            }

            break;

        default:
            return maybeToken(tokenizer);
    }
}

function parse(source) {
    const tokenizer$1 = new tokenizer.Tokenizer(source);
    const result = readImplicitGroup(tokenizer$1);

    if (tokenizer$1.pos !== source.length) {
        tokenizer$1.error('Unexpected input');
    }

    // reduce redundant groups with single group term
    if (result.terms.length === 1 && result.terms[0].type === 'Group') {
        return result.terms[0];
    }

    return result;
}

exports.parse = parse;


/***/ }),

/***/ 1627:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const _SyntaxError = __webpack_require__(3921);

const TAB = 9;
const N = 10;
const F = 12;
const R = 13;
const SPACE = 32;

class Tokenizer {
    constructor(str) {
        this.str = str;
        this.pos = 0;
    }
    charCodeAt(pos) {
        return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
    }
    charCode() {
        return this.charCodeAt(this.pos);
    }
    nextCharCode() {
        return this.charCodeAt(this.pos + 1);
    }
    nextNonWsCode(pos) {
        return this.charCodeAt(this.findWsEnd(pos));
    }
    findWsEnd(pos) {
        for (; pos < this.str.length; pos++) {
            const code = this.str.charCodeAt(pos);
            if (code !== R && code !== N && code !== F && code !== SPACE && code !== TAB) {
                break;
            }
        }

        return pos;
    }
    substringToPos(end) {
        return this.str.substring(this.pos, this.pos = end);
    }
    eat(code) {
        if (this.charCode() !== code) {
            this.error('Expect `' + String.fromCharCode(code) + '`');
        }

        this.pos++;
    }
    peek() {
        return this.pos < this.str.length ? this.str.charAt(this.pos++) : '';
    }
    error(message) {
        throw new _SyntaxError.SyntaxError(message, this.str, this.pos);
    }
}

exports.Tokenizer = Tokenizer;


/***/ }),

/***/ 2388:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const noop = function() {};

function ensureFunction(value) {
    return typeof value === 'function' ? value : noop;
}

function walk(node, options, context) {
    function walk(node) {
        enter.call(context, node);

        switch (node.type) {
            case 'Group':
                node.terms.forEach(walk);
                break;

            case 'Multiplier':
                walk(node.term);
                break;

            case 'Type':
            case 'Property':
            case 'Keyword':
            case 'AtKeyword':
            case 'Function':
            case 'String':
            case 'Token':
            case 'Comma':
                break;

            default:
                throw new Error('Unknown type: ' + node.type);
        }

        leave.call(context, node);
    }

    let enter = noop;
    let leave = noop;

    if (typeof options === 'function') {
        enter = options;
    } else if (options) {
        enter = ensureFunction(options.enter);
        leave = ensureFunction(options.leave);
    }

    if (enter === noop && leave === noop) {
        throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
    }

    walk(node);
}

exports.walk = walk;


/***/ }),

/***/ 9074:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const index = __webpack_require__(338);
const sourceMap = __webpack_require__(4553);
const tokenBefore = __webpack_require__(7284);
const types = __webpack_require__(4764);

const REVERSESOLIDUS = 0x005c; // U+005C REVERSE SOLIDUS (\)

function processChildren(node, delimeter) {
    if (typeof delimeter === 'function') {
        let prev = null;

        node.children.forEach(node => {
            if (prev !== null) {
                delimeter.call(this, prev);
            }

            this.node(node);
            prev = node;
        });

        return;
    }

    node.children.forEach(this.node, this);
}

function processChunk(chunk) {
    index.tokenize(chunk, (type, start, end) => {
        this.token(type, chunk.slice(start, end));
    });
}

function createGenerator(config) {
    const types$1 = new Map();

    for (let name in config.node) {
        types$1.set(name, config.node[name].generate);
    }

    return function(node, options) {
        let buffer = '';
        let prevCode = 0;
        let handlers = {
            node(node) {
                if (types$1.has(node.type)) {
                    types$1.get(node.type).call(publicApi, node);
                } else {
                    throw new Error('Unknown node type: ' + node.type);
                }
            },
            tokenBefore: tokenBefore.safe,
            token(type, value) {
                prevCode = this.tokenBefore(prevCode, type, value);

                this.emit(value, type, false);

                if (type === types.Delim && value.charCodeAt(0) === REVERSESOLIDUS) {
                    this.emit('\n', types.WhiteSpace, true);
                }
            },
            emit(value) {
                buffer += value;
            },
            result() {
                return buffer;
            }
        };

        if (options) {
            if (typeof options.decorator === 'function') {
                handlers = options.decorator(handlers);
            }

            if (options.sourceMap) {
                handlers = sourceMap.generateSourceMap(handlers);
            }

            if (options.mode in tokenBefore) {
                handlers.tokenBefore = tokenBefore[options.mode];
            }
        }

        const publicApi = {
            node: (node) => handlers.node(node),
            children: processChildren,
            token: (type, value) => handlers.token(type, value),
            tokenize: processChunk
        };

        handlers.node(node);

        return handlers.result();
    };
}

exports.createGenerator = createGenerator;


/***/ }),

/***/ 4553:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const sourceMapGenerator_js = __webpack_require__(5997);

const trackNodes = new Set(['Atrule', 'Selector', 'Declaration']);

function generateSourceMap(handlers) {
    const map = new sourceMapGenerator_js.SourceMapGenerator();
    const generated = {
        line: 1,
        column: 0
    };
    const original = {
        line: 0, // should be zero to add first mapping
        column: 0
    };
    const activatedGenerated = {
        line: 1,
        column: 0
    };
    const activatedMapping = {
        generated: activatedGenerated
    };
    let line = 1;
    let column = 0;
    let sourceMappingActive = false;

    const origHandlersNode = handlers.node;
    handlers.node = function(node) {
        if (node.loc && node.loc.start && trackNodes.has(node.type)) {
            const nodeLine = node.loc.start.line;
            const nodeColumn = node.loc.start.column - 1;

            if (original.line !== nodeLine ||
                original.column !== nodeColumn) {
                original.line = nodeLine;
                original.column = nodeColumn;

                generated.line = line;
                generated.column = column;

                if (sourceMappingActive) {
                    sourceMappingActive = false;
                    if (generated.line !== activatedGenerated.line ||
                        generated.column !== activatedGenerated.column) {
                        map.addMapping(activatedMapping);
                    }
                }

                sourceMappingActive = true;
                map.addMapping({
                    source: node.loc.source,
                    original,
                    generated
                });
            }
        }

        origHandlersNode.call(this, node);

        if (sourceMappingActive && trackNodes.has(node.type)) {
            activatedGenerated.line = line;
            activatedGenerated.column = column;
        }
    };

    const origHandlersEmit = handlers.emit;
    handlers.emit = function(value, type, auto) {
        for (let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) === 10) { // \n
                line++;
                column = 0;
            } else {
                column++;
            }
        }

        origHandlersEmit(value, type, auto);
    };

    const origHandlersResult = handlers.result;
    handlers.result = function() {
        if (sourceMappingActive) {
            map.addMapping(activatedMapping);
        }

        return {
            css: origHandlersResult(),
            map
        };
    };

    return handlers;
}

exports.generateSourceMap = generateSourceMap;


/***/ }),

/***/ 7284:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)

const code = (type, value) => {
    if (type === types.Delim) {
        type = value;
    }

    if (typeof type === 'string') {
        const charCode = type.charCodeAt(0);
        return charCode > 0x7F ? 0x8000 : charCode << 8;
    }

    return type;
};

// https://www.w3.org/TR/css-syntax-3/#serialization
// The only requirement for serialization is that it must "round-trip" with parsing,
// that is, parsing the stylesheet must produce the same data structures as parsing,
// serializing, and parsing again, except for consecutive <whitespace-token>s,
// which may be collapsed into a single token.

const specPairs = [
    [types.Ident, types.Ident],
    [types.Ident, types.Function],
    [types.Ident, types.Url],
    [types.Ident, types.BadUrl],
    [types.Ident, '-'],
    [types.Ident, types.Number],
    [types.Ident, types.Percentage],
    [types.Ident, types.Dimension],
    [types.Ident, types.CDC],
    [types.Ident, types.LeftParenthesis],

    [types.AtKeyword, types.Ident],
    [types.AtKeyword, types.Function],
    [types.AtKeyword, types.Url],
    [types.AtKeyword, types.BadUrl],
    [types.AtKeyword, '-'],
    [types.AtKeyword, types.Number],
    [types.AtKeyword, types.Percentage],
    [types.AtKeyword, types.Dimension],
    [types.AtKeyword, types.CDC],

    [types.Hash, types.Ident],
    [types.Hash, types.Function],
    [types.Hash, types.Url],
    [types.Hash, types.BadUrl],
    [types.Hash, '-'],
    [types.Hash, types.Number],
    [types.Hash, types.Percentage],
    [types.Hash, types.Dimension],
    [types.Hash, types.CDC],

    [types.Dimension, types.Ident],
    [types.Dimension, types.Function],
    [types.Dimension, types.Url],
    [types.Dimension, types.BadUrl],
    [types.Dimension, '-'],
    [types.Dimension, types.Number],
    [types.Dimension, types.Percentage],
    [types.Dimension, types.Dimension],
    [types.Dimension, types.CDC],

    ['#', types.Ident],
    ['#', types.Function],
    ['#', types.Url],
    ['#', types.BadUrl],
    ['#', '-'],
    ['#', types.Number],
    ['#', types.Percentage],
    ['#', types.Dimension],
    ['#', types.CDC], // https://github.com/w3c/csswg-drafts/pull/6874

    ['-', types.Ident],
    ['-', types.Function],
    ['-', types.Url],
    ['-', types.BadUrl],
    ['-', '-'],
    ['-', types.Number],
    ['-', types.Percentage],
    ['-', types.Dimension],
    ['-', types.CDC], // https://github.com/w3c/csswg-drafts/pull/6874

    [types.Number, types.Ident],
    [types.Number, types.Function],
    [types.Number, types.Url],
    [types.Number, types.BadUrl],
    [types.Number, types.Number],
    [types.Number, types.Percentage],
    [types.Number, types.Dimension],
    [types.Number, '%'],
    [types.Number, types.CDC], // https://github.com/w3c/csswg-drafts/pull/6874

    ['@', types.Ident],
    ['@', types.Function],
    ['@', types.Url],
    ['@', types.BadUrl],
    ['@', '-'],
    ['@', types.CDC], // https://github.com/w3c/csswg-drafts/pull/6874

    ['.', types.Number],
    ['.', types.Percentage],
    ['.', types.Dimension],

    ['+', types.Number],
    ['+', types.Percentage],
    ['+', types.Dimension],

    ['/', '*']
];
// validate with scripts/generate-safe
const safePairs = specPairs.concat([
    [types.Ident, types.Hash],

    [types.Dimension, types.Hash],

    [types.Hash, types.Hash],

    [types.AtKeyword, types.LeftParenthesis],
    [types.AtKeyword, types.String],
    [types.AtKeyword, types.Colon],

    [types.Percentage, types.Percentage],
    [types.Percentage, types.Dimension],
    [types.Percentage, types.Function],
    [types.Percentage, '-'],

    [types.RightParenthesis, types.Ident],
    [types.RightParenthesis, types.Function],
    [types.RightParenthesis, types.Percentage],
    [types.RightParenthesis, types.Dimension],
    [types.RightParenthesis, types.Hash],
    [types.RightParenthesis, '-']
]);

function createMap(pairs) {
    const isWhiteSpaceRequired = new Set(
        pairs.map(([prev, next]) => (code(prev) << 16 | code(next)))
    );

    return function(prevCode, type, value) {
        const nextCode = code(type, value);
        const nextCharCode = value.charCodeAt(0);
        const emitWs =
            (nextCharCode === HYPHENMINUS &&
                type !== types.Ident &&
                type !== types.Function &&
                type !== types.CDC) ||
            (nextCharCode === PLUSSIGN)
                ? isWhiteSpaceRequired.has(prevCode << 16 | nextCharCode << 8)
                : isWhiteSpaceRequired.has(prevCode << 16 | nextCode);

        if (emitWs) {
            this.emit(' ', types.WhiteSpace, true);
        }

        return nextCode;
    };
}

const spec = createMap(specPairs);
const safe = createMap(safePairs);

exports.safe = safe;
exports.spec = spec;


/***/ }),

/***/ 3889:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const index$1 = __webpack_require__(4393);
const version = __webpack_require__(9909);
const create = __webpack_require__(3547);
const List = __webpack_require__(2080);
const Lexer = __webpack_require__(2636);
const types = __webpack_require__(4764);
__webpack_require__(7154);
const names = __webpack_require__(7169);
const TokenStream = __webpack_require__(7989);
const index = __webpack_require__(7);
const clone = __webpack_require__(6315);
const names$1 = __webpack_require__(2543);
const ident = __webpack_require__(8866);
const string = __webpack_require__(1705);
const url = __webpack_require__(213);

const {
    tokenize,
    parse,
    generate,
    lexer,
    createLexer,

    walk,
    find,
    findLast,
    findAll,

    toPlainObject,
    fromPlainObject,

    fork
} = index$1;

exports.version = version.version;
exports.createSyntax = create;
exports.List = List.List;
exports.Lexer = Lexer.Lexer;
exports.tokenTypes = types;
exports.tokenNames = names;
exports.TokenStream = TokenStream.TokenStream;
exports.definitionSyntax = index;
exports.clone = clone.clone;
exports.isCustomProperty = names$1.isCustomProperty;
exports.keyword = names$1.keyword;
exports.property = names$1.property;
exports.vendorPrefix = names$1.vendorPrefix;
exports.ident = ident;
exports.string = string;
exports.url = url;
exports.createLexer = createLexer;
exports.find = find;
exports.findAll = findAll;
exports.findLast = findLast;
exports.fork = fork;
exports.fromPlainObject = fromPlainObject;
exports.generate = generate;
exports.lexer = lexer;
exports.parse = parse;
exports.toPlainObject = toPlainObject;
exports.tokenize = tokenize;
exports.walk = walk;


/***/ }),

/***/ 2636:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const error = __webpack_require__(1345);
const names = __webpack_require__(2543);
const generic = __webpack_require__(8148);
const generate = __webpack_require__(9931);
const parse = __webpack_require__(8544);
const walk = __webpack_require__(2388);
const prepareTokens = __webpack_require__(7889);
const matchGraph = __webpack_require__(4352);
const match = __webpack_require__(3474);
const trace = __webpack_require__(7991);
const search = __webpack_require__(8152);
const structure = __webpack_require__(91);

const cssWideKeywords = matchGraph.buildMatchGraph('inherit | initial | unset');
const cssWideKeywordsWithExpression = matchGraph.buildMatchGraph('inherit | initial | unset | <-ms-legacy-expression>');

function dumpMapSyntax(map, compact, syntaxAsAst) {
    const result = {};

    for (const name in map) {
        if (map[name].syntax) {
            result[name] = syntaxAsAst
                ? map[name].syntax
                : generate.generate(map[name].syntax, { compact });
        }
    }

    return result;
}

function dumpAtruleMapSyntax(map, compact, syntaxAsAst) {
    const result = {};

    for (const [name, atrule] of Object.entries(map)) {
        result[name] = {
            prelude: atrule.prelude && (
                syntaxAsAst
                    ? atrule.prelude.syntax
                    : generate.generate(atrule.prelude.syntax, { compact })
            ),
            descriptors: atrule.descriptors && dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst)
        };
    }

    return result;
}

function valueHasVar(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].value.toLowerCase() === 'var(') {
            return true;
        }
    }

    return false;
}

function buildMatchResult(matched, error, iterations) {
    return {
        matched,
        iterations,
        error,
        ...trace
    };
}

function matchSyntax(lexer, syntax, value, useCommon) {
    const tokens = prepareTokens(value, lexer.syntax);
    let result;

    if (valueHasVar(tokens)) {
        return buildMatchResult(null, new Error('Matching for a tree with var() is not supported'));
    }

    if (useCommon) {
        result = match.matchAsTree(tokens, lexer.valueCommonSyntax, lexer);
    }

    if (!useCommon || !result.match) {
        result = match.matchAsTree(tokens, syntax.match, lexer);
        if (!result.match) {
            return buildMatchResult(
                null,
                new error.SyntaxMatchError(result.reason, syntax.syntax, value, result),
                result.iterations
            );
        }
    }

    return buildMatchResult(result.match, null, result.iterations);
}

class Lexer {
    constructor(config, syntax, structure$1) {
        this.valueCommonSyntax = cssWideKeywords;
        this.syntax = syntax;
        this.generic = false;
        this.atrules = Object.create(null);
        this.properties = Object.create(null);
        this.types = Object.create(null);
        this.structure = structure$1 || structure.getStructureFromConfig(config);

        if (config) {
            if (config.types) {
                for (const name in config.types) {
                    this.addType_(name, config.types[name]);
                }
            }

            if (config.generic) {
                this.generic = true;
                for (const name in generic) {
                    this.addType_(name, generic[name]);
                }
            }

            if (config.atrules) {
                for (const name in config.atrules) {
                    this.addAtrule_(name, config.atrules[name]);
                }
            }

            if (config.properties) {
                for (const name in config.properties) {
                    this.addProperty_(name, config.properties[name]);
                }
            }
        }
    }

    checkStructure(ast) {
        function collectWarning(node, message) {
            warns.push({ node, message });
        }

        const structure = this.structure;
        const warns = [];

        this.syntax.walk(ast, function(node) {
            if (structure.hasOwnProperty(node.type)) {
                structure[node.type].check(node, collectWarning);
            } else {
                collectWarning(node, 'Unknown node type `' + node.type + '`');
            }
        });

        return warns.length ? warns : false;
    }

    createDescriptor(syntax, type, name, parent = null) {
        const ref = {
            type,
            name
        };
        const descriptor = {
            type,
            name,
            parent,
            serializable: typeof syntax === 'string' || (syntax && typeof syntax.type === 'string'),
            syntax: null,
            match: null
        };

        if (typeof syntax === 'function') {
            descriptor.match = matchGraph.buildMatchGraph(syntax, ref);
        } else {
            if (typeof syntax === 'string') {
                // lazy parsing on first access
                Object.defineProperty(descriptor, 'syntax', {
                    get() {
                        Object.defineProperty(descriptor, 'syntax', {
                            value: parse.parse(syntax)
                        });

                        return descriptor.syntax;
                    }
                });
            } else {
                descriptor.syntax = syntax;
            }

            // lazy graph build on first access
            Object.defineProperty(descriptor, 'match', {
                get() {
                    Object.defineProperty(descriptor, 'match', {
                        value: matchGraph.buildMatchGraph(descriptor.syntax, ref)
                    });

                    return descriptor.match;
                }
            });
        }

        return descriptor;
    }
    addAtrule_(name, syntax) {
        if (!syntax) {
            return;
        }

        this.atrules[name] = {
            type: 'Atrule',
            name: name,
            prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, 'AtrulePrelude', name) : null,
            descriptors: syntax.descriptors
                ? Object.keys(syntax.descriptors).reduce(
                    (map, descName) => {
                        map[descName] = this.createDescriptor(syntax.descriptors[descName], 'AtruleDescriptor', descName, name);
                        return map;
                    },
                    Object.create(null)
                )
                : null
        };
    }
    addProperty_(name, syntax) {
        if (!syntax) {
            return;
        }

        this.properties[name] = this.createDescriptor(syntax, 'Property', name);
    }
    addType_(name, syntax) {
        if (!syntax) {
            return;
        }

        this.types[name] = this.createDescriptor(syntax, 'Type', name);

        if (syntax === generic['-ms-legacy-expression']) {
            this.valueCommonSyntax = cssWideKeywordsWithExpression;
        }
    }

    checkAtruleName(atruleName) {
        if (!this.getAtrule(atruleName)) {
            return new error.SyntaxReferenceError('Unknown at-rule', '@' + atruleName);
        }
    }
    checkAtrulePrelude(atruleName, prelude) {
        const error = this.checkAtruleName(atruleName);

        if (error) {
            return error;
        }

        const atrule = this.getAtrule(atruleName);

        if (!atrule.prelude && prelude) {
            return new SyntaxError('At-rule `@' + atruleName + '` should not contain a prelude');
        }

        if (atrule.prelude && !prelude) {
            return new SyntaxError('At-rule `@' + atruleName + '` should contain a prelude');
        }
    }
    checkAtruleDescriptorName(atruleName, descriptorName) {
        const error$1 = this.checkAtruleName(atruleName);

        if (error$1) {
            return error$1;
        }

        const atrule = this.getAtrule(atruleName);
        const descriptor = names.keyword(descriptorName);

        if (!atrule.descriptors) {
            return new SyntaxError('At-rule `@' + atruleName + '` has no known descriptors');
        }

        if (!atrule.descriptors[descriptor.name] &&
            !atrule.descriptors[descriptor.basename]) {
            return new error.SyntaxReferenceError('Unknown at-rule descriptor', descriptorName);
        }
    }
    checkPropertyName(propertyName) {
        if (!this.getProperty(propertyName)) {
            return new error.SyntaxReferenceError('Unknown property', propertyName);
        }
    }

    matchAtrulePrelude(atruleName, prelude) {
        const error = this.checkAtrulePrelude(atruleName, prelude);

        if (error) {
            return buildMatchResult(null, error);
        }

        if (!prelude) {
            return buildMatchResult(null, null);
        }

        return matchSyntax(this, this.getAtrule(atruleName).prelude, prelude, false);
    }
    matchAtruleDescriptor(atruleName, descriptorName, value) {
        const error = this.checkAtruleDescriptorName(atruleName, descriptorName);

        if (error) {
            return buildMatchResult(null, error);
        }

        const atrule = this.getAtrule(atruleName);
        const descriptor = names.keyword(descriptorName);

        return matchSyntax(this, atrule.descriptors[descriptor.name] || atrule.descriptors[descriptor.basename], value, false);
    }
    matchDeclaration(node) {
        if (node.type !== 'Declaration') {
            return buildMatchResult(null, new Error('Not a Declaration node'));
        }

        return this.matchProperty(node.property, node.value);
    }
    matchProperty(propertyName, value) {
        // don't match syntax for a custom property at the moment
        if (names.property(propertyName).custom) {
            return buildMatchResult(null, new Error('Lexer matching doesn\'t applicable for custom properties'));
        }

        const error = this.checkPropertyName(propertyName);

        if (error) {
            return buildMatchResult(null, error);
        }

        return matchSyntax(this, this.getProperty(propertyName), value, true);
    }
    matchType(typeName, value) {
        const typeSyntax = this.getType(typeName);

        if (!typeSyntax) {
            return buildMatchResult(null, new error.SyntaxReferenceError('Unknown type', typeName));
        }

        return matchSyntax(this, typeSyntax, value, false);
    }
    match(syntax, value) {
        if (typeof syntax !== 'string' && (!syntax || !syntax.type)) {
            return buildMatchResult(null, new error.SyntaxReferenceError('Bad syntax'));
        }

        if (typeof syntax === 'string' || !syntax.match) {
            syntax = this.createDescriptor(syntax, 'Type', 'anonymous');
        }

        return matchSyntax(this, syntax, value, false);
    }

    findValueFragments(propertyName, value, type, name) {
        return search.matchFragments(this, value, this.matchProperty(propertyName, value), type, name);
    }
    findDeclarationValueFragments(declaration, type, name) {
        return search.matchFragments(this, declaration.value, this.matchDeclaration(declaration), type, name);
    }
    findAllFragments(ast, type, name) {
        const result = [];

        this.syntax.walk(ast, {
            visit: 'Declaration',
            enter: (declaration) => {
                result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name));
            }
        });

        return result;
    }

    getAtrule(atruleName, fallbackBasename = true) {
        const atrule = names.keyword(atruleName);
        const atruleEntry = atrule.vendor && fallbackBasename
            ? this.atrules[atrule.name] || this.atrules[atrule.basename]
            : this.atrules[atrule.name];

        return atruleEntry || null;
    }
    getAtrulePrelude(atruleName, fallbackBasename = true) {
        const atrule = this.getAtrule(atruleName, fallbackBasename);

        return atrule && atrule.prelude || null;
    }
    getAtruleDescriptor(atruleName, name) {
        return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators
            ? this.atrules[atruleName].declarators[name] || null
            : null;
    }
    getProperty(propertyName, fallbackBasename = true) {
        const property = names.property(propertyName);
        const propertyEntry = property.vendor && fallbackBasename
            ? this.properties[property.name] || this.properties[property.basename]
            : this.properties[property.name];

        return propertyEntry || null;
    }
    getType(name) {
        return hasOwnProperty.call(this.types, name) ? this.types[name] : null;
    }

    validate() {
        function validate(syntax, name, broken, descriptor) {
            if (broken.has(name)) {
                return broken.get(name);
            }

            broken.set(name, false);
            if (descriptor.syntax !== null) {
                walk.walk(descriptor.syntax, function(node) {
                    if (node.type !== 'Type' && node.type !== 'Property') {
                        return;
                    }

                    const map = node.type === 'Type' ? syntax.types : syntax.properties;
                    const brokenMap = node.type === 'Type' ? brokenTypes : brokenProperties;

                    if (!hasOwnProperty.call(map, node.name) || validate(syntax, node.name, brokenMap, map[node.name])) {
                        broken.set(name, true);
                    }
                }, this);
            }
        }

        let brokenTypes = new Map();
        let brokenProperties = new Map();

        for (const key in this.types) {
            validate(this, key, brokenTypes, this.types[key]);
        }

        for (const key in this.properties) {
            validate(this, key, brokenProperties, this.properties[key]);
        }

        brokenTypes = [...brokenTypes.keys()].filter(name => brokenTypes.get(name));
        brokenProperties = [...brokenProperties.keys()].filter(name => brokenProperties.get(name));

        if (brokenTypes.length || brokenProperties.length) {
            return {
                types: brokenTypes,
                properties: brokenProperties
            };
        }

        return null;
    }
    dump(syntaxAsAst, pretty) {
        return {
            generic: this.generic,
            types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
            properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
            atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst)
        };
    }
    toString() {
        return JSON.stringify(this.dump());
    }
}

exports.Lexer = Lexer;


/***/ }),

/***/ 1345:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const createCustomError = __webpack_require__(7324);
const generate = __webpack_require__(9931);

const defaultLoc = { offset: 0, line: 1, column: 1 };

function locateMismatch(matchResult, node) {
    const tokens = matchResult.tokens;
    const longestMatch = matchResult.longestMatch;
    const mismatchNode = longestMatch < tokens.length ? tokens[longestMatch].node || null : null;
    const badNode = mismatchNode !== node ? mismatchNode : null;
    let mismatchOffset = 0;
    let mismatchLength = 0;
    let entries = 0;
    let css = '';
    let start;
    let end;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].value;

        if (i === longestMatch) {
            mismatchLength = token.length;
            mismatchOffset = css.length;
        }

        if (badNode !== null && tokens[i].node === badNode) {
            if (i <= longestMatch) {
                entries++;
            } else {
                entries = 0;
            }
        }

        css += token;
    }

    if (longestMatch === tokens.length || entries > 1) { // last
        start = fromLoc(badNode || node, 'end') || buildLoc(defaultLoc, css);
        end = buildLoc(start);
    } else {
        start = fromLoc(badNode, 'start') ||
            buildLoc(fromLoc(node, 'start') || defaultLoc, css.slice(0, mismatchOffset));
        end = fromLoc(badNode, 'end') ||
            buildLoc(start, css.substr(mismatchOffset, mismatchLength));
    }

    return {
        css,
        mismatchOffset,
        mismatchLength,
        start,
        end
    };
}

function fromLoc(node, point) {
    const value = node && node.loc && node.loc[point];

    if (value) {
        return 'line' in value ? buildLoc(value) : value;
    }

    return null;
}

function buildLoc({ offset, line, column }, extra) {
    const loc = {
        offset,
        line,
        column
    };

    if (extra) {
        const lines = extra.split(/\n|\r\n?|\f/);

        loc.offset += extra.length;
        loc.line += lines.length - 1;
        loc.column = lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1;
    }

    return loc;
}

const SyntaxReferenceError = function(type, referenceName) {
    const error = createCustomError.createCustomError(
        'SyntaxReferenceError',
        type + (referenceName ? ' `' + referenceName + '`' : '')
    );

    error.reference = referenceName;

    return error;
};

const SyntaxMatchError = function(message, syntax, node, matchResult) {
    const error = createCustomError.createCustomError('SyntaxMatchError', message);
    const {
        css,
        mismatchOffset,
        mismatchLength,
        start,
        end
    } = locateMismatch(matchResult, node);

    error.rawMessage = message;
    error.syntax = syntax ? generate.generate(syntax) : '<generic>';
    error.css = css;
    error.mismatchOffset = mismatchOffset;
    error.mismatchLength = mismatchLength;
    error.message = message + '\n' +
        '  syntax: ' + error.syntax + '\n' +
        '   value: ' + (css || '<empty string>') + '\n' +
        '  --------' + new Array(error.mismatchOffset + 1).join('-') + '^';

    Object.assign(error, start);
    error.loc = {
        source: (node && node.loc && node.loc.source) || '<unknown>',
        start,
        end
    };

    return error;
};

exports.SyntaxMatchError = SyntaxMatchError;
exports.SyntaxReferenceError = SyntaxReferenceError;


/***/ }),

/***/ 5865:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
const charCodeDefinitions = __webpack_require__(7154);
const utils = __webpack_require__(9708);

const PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
const N = 0x006E;           // U+006E LATIN SMALL LETTER N (n)
const DISALLOW_SIGN = true;
const ALLOW_SIGN = false;

function isDelim(token, code) {
    return token !== null && token.type === types.Delim && token.value.charCodeAt(0) === code;
}

function skipSC(token, offset, getNextToken) {
    while (token !== null && (token.type === types.WhiteSpace || token.type === types.Comment)) {
        token = getNextToken(++offset);
    }

    return offset;
}

function checkInteger(token, valueOffset, disallowSign, offset) {
    if (!token) {
        return 0;
    }

    const code = token.value.charCodeAt(valueOffset);

    if (code === PLUSSIGN || code === HYPHENMINUS) {
        if (disallowSign) {
            // Number sign is not allowed
            return 0;
        }
        valueOffset++;
    }

    for (; valueOffset < token.value.length; valueOffset++) {
        if (!charCodeDefinitions.isDigit(token.value.charCodeAt(valueOffset))) {
            // Integer is expected
            return 0;
        }
    }

    return offset + 1;
}

// ... <signed-integer>
// ... ['+' | '-'] <signless-integer>
function consumeB(token, offset_, getNextToken) {
    let sign = false;
    let offset = skipSC(token, offset_, getNextToken);

    token = getNextToken(offset);

    if (token === null) {
        return offset_;
    }

    if (token.type !== types.Number) {
        if (isDelim(token, PLUSSIGN) || isDelim(token, HYPHENMINUS)) {
            sign = true;
            offset = skipSC(getNextToken(++offset), offset, getNextToken);
            token = getNextToken(offset);

            if (token === null || token.type !== types.Number) {
                return 0;
            }
        } else {
            return offset_;
        }
    }

    if (!sign) {
        const code = token.value.charCodeAt(0);
        if (code !== PLUSSIGN && code !== HYPHENMINUS) {
            // Number sign is expected
            return 0;
        }
    }

    return checkInteger(token, sign ? 0 : 1, sign, offset);
}

// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
function anPlusB(token, getNextToken) {
    /* eslint-disable brace-style*/
    let offset = 0;

    if (!token) {
        return 0;
    }

    // <integer>
    if (token.type === types.Number) {
        return checkInteger(token, 0, ALLOW_SIGN, offset); // b
    }

    // -n
    // -n <signed-integer>
    // -n ['+' | '-'] <signless-integer>
    // -n- <signless-integer>
    // <dashndashdigit-ident>
    else if (token.type === types.Ident && token.value.charCodeAt(0) === HYPHENMINUS) {
        // expect 1st char is N
        if (!utils.cmpChar(token.value, 1, N)) {
            return 0;
        }

        switch (token.value.length) {
            // -n
            // -n <signed-integer>
            // -n ['+' | '-'] <signless-integer>
            case 2:
                return consumeB(getNextToken(++offset), offset, getNextToken);

            // -n- <signless-integer>
            case 3:
                if (token.value.charCodeAt(2) !== HYPHENMINUS) {
                    return 0;
                }

                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);

            // <dashndashdigit-ident>
            default:
                if (token.value.charCodeAt(2) !== HYPHENMINUS) {
                    return 0;
                }

                return checkInteger(token, 3, DISALLOW_SIGN, offset);
        }
    }

    // '+'? n
    // '+'? n <signed-integer>
    // '+'? n ['+' | '-'] <signless-integer>
    // '+'? n- <signless-integer>
    // '+'? <ndashdigit-ident>
    else if (token.type === types.Ident || (isDelim(token, PLUSSIGN) && getNextToken(offset + 1).type === types.Ident)) {
        // just ignore a plus
        if (token.type !== types.Ident) {
            token = getNextToken(++offset);
        }

        if (token === null || !utils.cmpChar(token.value, 0, N)) {
            return 0;
        }

        switch (token.value.length) {
            // '+'? n
            // '+'? n <signed-integer>
            // '+'? n ['+' | '-'] <signless-integer>
            case 1:
                return consumeB(getNextToken(++offset), offset, getNextToken);

            // '+'? n- <signless-integer>
            case 2:
                if (token.value.charCodeAt(1) !== HYPHENMINUS) {
                    return 0;
                }

                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);

            // '+'? <ndashdigit-ident>
            default:
                if (token.value.charCodeAt(1) !== HYPHENMINUS) {
                    return 0;
                }

                return checkInteger(token, 2, DISALLOW_SIGN, offset);
        }
    }

    // <ndashdigit-dimension>
    // <ndash-dimension> <signless-integer>
    // <n-dimension>
    // <n-dimension> <signed-integer>
    // <n-dimension> ['+' | '-'] <signless-integer>
    else if (token.type === types.Dimension) {
        let code = token.value.charCodeAt(0);
        let sign = code === PLUSSIGN || code === HYPHENMINUS ? 1 : 0;
        let i = sign;

        for (; i < token.value.length; i++) {
            if (!charCodeDefinitions.isDigit(token.value.charCodeAt(i))) {
                break;
            }
        }

        if (i === sign) {
            // Integer is expected
            return 0;
        }

        if (!utils.cmpChar(token.value, i, N)) {
            return 0;
        }

        // <n-dimension>
        // <n-dimension> <signed-integer>
        // <n-dimension> ['+' | '-'] <signless-integer>
        if (i + 1 === token.value.length) {
            return consumeB(getNextToken(++offset), offset, getNextToken);
        } else {
            if (token.value.charCodeAt(i + 1) !== HYPHENMINUS) {
                return 0;
            }

            // <ndash-dimension> <signless-integer>
            if (i + 2 === token.value.length) {
                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);
            }
            // <ndashdigit-dimension>
            else {
                return checkInteger(token, i + 2, DISALLOW_SIGN, offset);
            }
        }
    }

    return 0;
}

module.exports = anPlusB;


/***/ }),

/***/ 6664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
const charCodeDefinitions = __webpack_require__(7154);
const utils = __webpack_require__(9708);

const PLUSSIGN = 0x002B;     // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D;  // U+002D HYPHEN-MINUS (-)
const QUESTIONMARK = 0x003F; // U+003F QUESTION MARK (?)
const U = 0x0075;            // U+0075 LATIN SMALL LETTER U (u)

function isDelim(token, code) {
    return token !== null && token.type === types.Delim && token.value.charCodeAt(0) === code;
}

function startsWith(token, code) {
    return token.value.charCodeAt(0) === code;
}

function hexSequence(token, offset, allowDash) {
    let hexlen = 0;

    for (let pos = offset; pos < token.value.length; pos++) {
        const code = token.value.charCodeAt(pos);

        if (code === HYPHENMINUS && allowDash && hexlen !== 0) {
            hexSequence(token, offset + hexlen + 1, false);
            return 6; // dissallow following question marks
        }

        if (!charCodeDefinitions.isHexDigit(code)) {
            return 0; // not a hex digit
        }

        if (++hexlen > 6) {
            return 0; // too many hex digits
        }    }

    return hexlen;
}

function withQuestionMarkSequence(consumed, length, getNextToken) {
    if (!consumed) {
        return 0; // nothing consumed
    }

    while (isDelim(getNextToken(length), QUESTIONMARK)) {
        if (++consumed > 6) {
            return 0; // too many question marks
        }

        length++;
    }

    return length;
}

// https://drafts.csswg.org/css-syntax/#urange
// Informally, the <urange> production has three forms:
// U+0001
//      Defines a range consisting of a single code point, in this case the code point "1".
// U+0001-00ff
//      Defines a range of codepoints between the first and the second value, in this case
//      the range between "1" and "ff" (255 in decimal) inclusive.
// U+00??
//      Defines a range of codepoints where the "?" characters range over all hex digits,
//      in this case defining the same as the value U+0000-00ff.
// In each form, a maximum of 6 digits is allowed for each hexadecimal number (if you treat "?" as a hexadecimal digit).
//
// <urange> =
//   u '+' <ident-token> '?'* |
//   u <dimension-token> '?'* |
//   u <number-token> '?'* |
//   u <number-token> <dimension-token> |
//   u <number-token> <number-token> |
//   u '+' '?'+
function urange(token, getNextToken) {
    let length = 0;

    // should start with `u` or `U`
    if (token === null || token.type !== types.Ident || !utils.cmpChar(token.value, 0, U)) {
        return 0;
    }

    token = getNextToken(++length);
    if (token === null) {
        return 0;
    }

    // u '+' <ident-token> '?'*
    // u '+' '?'+
    if (isDelim(token, PLUSSIGN)) {
        token = getNextToken(++length);
        if (token === null) {
            return 0;
        }

        if (token.type === types.Ident) {
            // u '+' <ident-token> '?'*
            return withQuestionMarkSequence(hexSequence(token, 0, true), ++length, getNextToken);
        }

        if (isDelim(token, QUESTIONMARK)) {
            // u '+' '?'+
            return withQuestionMarkSequence(1, ++length, getNextToken);
        }

        // Hex digit or question mark is expected
        return 0;
    }

    // u <number-token> '?'*
    // u <number-token> <dimension-token>
    // u <number-token> <number-token>
    if (token.type === types.Number) {
        const consumedHexLength = hexSequence(token, 1, true);
        if (consumedHexLength === 0) {
            return 0;
        }

        token = getNextToken(++length);
        if (token === null) {
            // u <number-token> <eof>
            return length;
        }

        if (token.type === types.Dimension || token.type === types.Number) {
            // u <number-token> <dimension-token>
            // u <number-token> <number-token>
            if (!startsWith(token, HYPHENMINUS) || !hexSequence(token, 1, false)) {
                return 0;
            }

            return length + 1;
        }

        // u <number-token> '?'*
        return withQuestionMarkSequence(consumedHexLength, length, getNextToken);
    }

    // u <dimension-token> '?'*
    if (token.type === types.Dimension) {
        return withQuestionMarkSequence(hexSequence(token, 1, true), ++length, getNextToken);
    }

    return 0;
}

module.exports = urange;


/***/ }),

/***/ 8148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const genericAnPlusB = __webpack_require__(5865);
const genericUrange = __webpack_require__(6664);
const types = __webpack_require__(4764);
const charCodeDefinitions = __webpack_require__(7154);
const utils = __webpack_require__(9708);

const cssWideKeywords = ['unset', 'initial', 'inherit'];
const calcFunctionNames = ['calc(', '-moz-calc(', '-webkit-calc('];
const balancePair = new Map([
    [types.Function, types.RightParenthesis],
    [types.LeftParenthesis, types.RightParenthesis],
    [types.LeftSquareBracket, types.RightSquareBracket],
    [types.LeftCurlyBracket, types.RightCurlyBracket]
]);

// units
const LENGTH = [                              // https://www.w3.org/TR/css-values-3/#lengths
    'px', 'mm', 'cm', 'in', 'pt', 'pc', 'q',  // absolute length units
    'em', 'ex', 'ch', 'rem',                  // relative length units
    'vh', 'vw', 'vmin', 'vmax', 'vm'          // viewport-percentage lengths
];
const ANGLE = ['deg', 'grad', 'rad', 'turn']; // https://www.w3.org/TR/css-values-3/#angles
const TIME = ['s', 'ms'];                     // https://www.w3.org/TR/css-values-3/#time
const FREQUENCY = ['hz', 'khz'];              // https://www.w3.org/TR/css-values-3/#frequency
const RESOLUTION = ['dpi', 'dpcm', 'dppx', 'x']; // https://www.w3.org/TR/css-values-3/#resolution
const FLEX = ['fr'];                          // https://drafts.csswg.org/css-grid/#fr-unit
const DECIBEL = ['db'];                       // https://www.w3.org/TR/css3-speech/#mixing-props-voice-volume
const SEMITONES = ['st'];                     // https://www.w3.org/TR/css3-speech/#voice-props-voice-pitch

// safe char code getter
function charCodeAt(str, index) {
    return index < str.length ? str.charCodeAt(index) : 0;
}

function eqStr(actual, expected) {
    return utils.cmpStr(actual, 0, actual.length, expected);
}

function eqStrAny(actual, expected) {
    for (let i = 0; i < expected.length; i++) {
        if (eqStr(actual, expected[i])) {
            return true;
        }
    }

    return false;
}

// IE postfix hack, i.e. 123\0 or 123px\9
function isPostfixIeHack(str, offset) {
    if (offset !== str.length - 2) {
        return false;
    }

    return (
        charCodeAt(str, offset) === 0x005C &&  // U+005C REVERSE SOLIDUS (\)
        charCodeDefinitions.isDigit(charCodeAt(str, offset + 1))
    );
}

function outOfRange(opts, value, numEnd) {
    if (opts && opts.type === 'Range') {
        const num = Number(
            numEnd !== undefined && numEnd !== value.length
                ? value.substr(0, numEnd)
                : value
        );

        if (isNaN(num)) {
            return true;
        }

        if (opts.min !== null && num < opts.min) {
            return true;
        }

        if (opts.max !== null && num > opts.max) {
            return true;
        }
    }

    return false;
}

function consumeFunction(token, getNextToken) {
    let balanceCloseType = 0;
    let balanceStash = [];
    let length = 0;

    // balanced token consuming
    scan:
    do {
        switch (token.type) {
            case types.RightCurlyBracket:
            case types.RightParenthesis:
            case types.RightSquareBracket:
                if (token.type !== balanceCloseType) {
                    break scan;
                }

                balanceCloseType = balanceStash.pop();

                if (balanceStash.length === 0) {
                    length++;
                    break scan;
                }

                break;

            case types.Function:
            case types.LeftParenthesis:
            case types.LeftSquareBracket:
            case types.LeftCurlyBracket:
                balanceStash.push(balanceCloseType);
                balanceCloseType = balancePair.get(token.type);
                break;
        }

        length++;
    } while (token = getNextToken(length));

    return length;
}

// TODO: implement
// can be used wherever <length>, <frequency>, <angle>, <time>, <percentage>, <number>, or <integer> values are allowed
// https://drafts.csswg.org/css-values/#calc-notation
function calc(next) {
    return function(token, getNextToken, opts) {
        if (token === null) {
            return 0;
        }

        if (token.type === types.Function && eqStrAny(token.value, calcFunctionNames)) {
            return consumeFunction(token, getNextToken);
        }

        return next(token, getNextToken, opts);
    };
}

function tokenType(expectedTokenType) {
    return function(token) {
        if (token === null || token.type !== expectedTokenType) {
            return 0;
        }

        return 1;
    };
}

function func(name) {
    name = name + '(';

    return function(token, getNextToken) {
        if (token !== null && eqStr(token.value, name)) {
            return consumeFunction(token, getNextToken);
        }

        return 0;
    };
}

// =========================
// Complex types
//

// https://drafts.csswg.org/css-values-4/#custom-idents
// 4.2. Author-defined Identifiers: the <custom-ident> type
// Some properties accept arbitrary author-defined identifiers as a component value.
// This generic data type is denoted by <custom-ident>, and represents any valid CSS identifier
// that would not be misinterpreted as a pre-defined keyword in that property’s value definition.
//
// See also: https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident
function customIdent(token) {
    if (token === null || token.type !== types.Ident) {
        return 0;
    }

    const name = token.value.toLowerCase();

    // The CSS-wide keywords are not valid <custom-ident>s
    if (eqStrAny(name, cssWideKeywords)) {
        return 0;
    }

    // The default keyword is reserved and is also not a valid <custom-ident>
    if (eqStr(name, 'default')) {
        return 0;
    }

    // TODO: ignore property specific keywords (as described https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident)
    // Specifications using <custom-ident> must specify clearly what other keywords
    // are excluded from <custom-ident>, if any—for example by saying that any pre-defined keywords
    // in that property’s value definition are excluded. Excluded keywords are excluded
    // in all ASCII case permutations.

    return 1;
}

// https://drafts.csswg.org/css-variables/#typedef-custom-property-name
// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS), like --foo.
// The <custom-property-name> production corresponds to this: it’s defined as any valid identifier
// that starts with two dashes, except -- itself, which is reserved for future use by CSS.
// NOTE: Current implementation treat `--` as a valid name since most (all?) major browsers treat it as valid.
function customPropertyName(token) {
    // ... defined as any valid identifier
    if (token === null || token.type !== types.Ident) {
        return 0;
    }

    // ... that starts with two dashes (U+002D HYPHEN-MINUS)
    if (charCodeAt(token.value, 0) !== 0x002D || charCodeAt(token.value, 1) !== 0x002D) {
        return 0;
    }

    return 1;
}

// https://drafts.csswg.org/css-color-4/#hex-notation
// The syntax of a <hex-color> is a <hash-token> token whose value consists of 3, 4, 6, or 8 hexadecimal digits.
// In other words, a hex color is written as a hash character, "#", followed by some number of digits 0-9 or
// letters a-f (the case of the letters doesn’t matter - #00ff00 is identical to #00FF00).
function hexColor(token) {
    if (token === null || token.type !== types.Hash) {
        return 0;
    }

    const length = token.value.length;

    // valid values (length): #rgb (4), #rgba (5), #rrggbb (7), #rrggbbaa (9)
    if (length !== 4 && length !== 5 && length !== 7 && length !== 9) {
        return 0;
    }

    for (let i = 1; i < length; i++) {
        if (!charCodeDefinitions.isHexDigit(charCodeAt(token.value, i))) {
            return 0;
        }
    }

    return 1;
}

function idSelector(token) {
    if (token === null || token.type !== types.Hash) {
        return 0;
    }

    if (!charCodeDefinitions.isIdentifierStart(charCodeAt(token.value, 1), charCodeAt(token.value, 2), charCodeAt(token.value, 3))) {
        return 0;
    }

    return 1;
}

// https://drafts.csswg.org/css-syntax/#any-value
// It represents the entirety of what a valid declaration can have as its value.
function declarationValue(token, getNextToken) {
    if (!token) {
        return 0;
    }

    let balanceCloseType = 0;
    let balanceStash = [];
    let length = 0;

    // The <declaration-value> production matches any sequence of one or more tokens,
    // so long as the sequence does not contain ...
    scan:
    do {
        switch (token.type) {
            // ... <bad-string-token>, <bad-url-token>,
            case types.BadString:
            case types.BadUrl:
                break scan;

            // ... unmatched <)-token>, <]-token>, or <}-token>,
            case types.RightCurlyBracket:
            case types.RightParenthesis:
            case types.RightSquareBracket:
                if (token.type !== balanceCloseType) {
                    break scan;
                }

                balanceCloseType = balanceStash.pop();
                break;

            // ... or top-level <semicolon-token> tokens
            case types.Semicolon:
                if (balanceCloseType === 0) {
                    break scan;
                }

                break;

            // ... or <delim-token> tokens with a value of "!"
            case types.Delim:
                if (balanceCloseType === 0 && token.value === '!') {
                    break scan;
                }

                break;

            case types.Function:
            case types.LeftParenthesis:
            case types.LeftSquareBracket:
            case types.LeftCurlyBracket:
                balanceStash.push(balanceCloseType);
                balanceCloseType = balancePair.get(token.type);
                break;
        }

        length++;
    } while (token = getNextToken(length));

    return length;
}

// https://drafts.csswg.org/css-syntax/#any-value
// The <any-value> production is identical to <declaration-value>, but also
// allows top-level <semicolon-token> tokens and <delim-token> tokens
// with a value of "!". It represents the entirety of what valid CSS can be in any context.
function anyValue(token, getNextToken) {
    if (!token) {
        return 0;
    }

    let balanceCloseType = 0;
    let balanceStash = [];
    let length = 0;

    // The <any-value> production matches any sequence of one or more tokens,
    // so long as the sequence ...
    scan:
    do {
        switch (token.type) {
            // ... does not contain <bad-string-token>, <bad-url-token>,
            case types.BadString:
            case types.BadUrl:
                break scan;

            // ... unmatched <)-token>, <]-token>, or <}-token>,
            case types.RightCurlyBracket:
            case types.RightParenthesis:
            case types.RightSquareBracket:
                if (token.type !== balanceCloseType) {
                    break scan;
                }

                balanceCloseType = balanceStash.pop();
                break;

            case types.Function:
            case types.LeftParenthesis:
            case types.LeftSquareBracket:
            case types.LeftCurlyBracket:
                balanceStash.push(balanceCloseType);
                balanceCloseType = balancePair.get(token.type);
                break;
        }

        length++;
    } while (token = getNextToken(length));

    return length;
}

// =========================
// Dimensions
//

function dimension(type) {
    if (type) {
        type = new Set(type);
    }

    return function(token, getNextToken, opts) {
        if (token === null || token.type !== types.Dimension) {
            return 0;
        }

        const numberEnd = utils.consumeNumber(token.value, 0);

        // check unit
        if (type !== null) {
            // check for IE postfix hack, i.e. 123px\0 or 123px\9
            const reverseSolidusOffset = token.value.indexOf('\\', numberEnd);
            const unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset)
                ? token.value.substr(numberEnd)
                : token.value.substring(numberEnd, reverseSolidusOffset);

            if (type.has(unit.toLowerCase()) === false) {
                return 0;
            }
        }

        // check range if specified
        if (outOfRange(opts, token.value, numberEnd)) {
            return 0;
        }

        return 1;
    };
}

// =========================
// Percentage
//

// §5.5. Percentages: the <percentage> type
// https://drafts.csswg.org/css-values-4/#percentages
function percentage(token, getNextToken, opts) {
    // ... corresponds to the <percentage-token> production
    if (token === null || token.type !== types.Percentage) {
        return 0;
    }

    // check range if specified
    if (outOfRange(opts, token.value, token.value.length - 1)) {
        return 0;
    }

    return 1;
}

// =========================
// Numeric
//

// https://drafts.csswg.org/css-values-4/#numbers
// The value <zero> represents a literal number with the value 0. Expressions that merely
// evaluate to a <number> with the value 0 (for example, calc(0)) do not match <zero>;
// only literal <number-token>s do.
function zero(next) {
    if (typeof next !== 'function') {
        next = function() {
            return 0;
        };
    }

    return function(token, getNextToken, opts) {
        if (token !== null && token.type === types.Number) {
            if (Number(token.value) === 0) {
                return 1;
            }
        }

        return next(token, getNextToken, opts);
    };
}

// § 5.3. Real Numbers: the <number> type
// https://drafts.csswg.org/css-values-4/#numbers
// Number values are denoted by <number>, and represent real numbers, possibly with a fractional component.
// ... It corresponds to the <number-token> production
function number(token, getNextToken, opts) {
    if (token === null) {
        return 0;
    }

    const numberEnd = utils.consumeNumber(token.value, 0);
    const isNumber = numberEnd === token.value.length;
    if (!isNumber && !isPostfixIeHack(token.value, numberEnd)) {
        return 0;
    }

    // check range if specified
    if (outOfRange(opts, token.value, numberEnd)) {
        return 0;
    }

    return 1;
}

// §5.2. Integers: the <integer> type
// https://drafts.csswg.org/css-values-4/#integers
function integer(token, getNextToken, opts) {
    // ... corresponds to a subset of the <number-token> production
    if (token === null || token.type !== types.Number) {
        return 0;
    }

    // The first digit of an integer may be immediately preceded by `-` or `+` to indicate the integer’s sign.
    let i = charCodeAt(token.value, 0) === 0x002B ||       // U+002B PLUS SIGN (+)
            charCodeAt(token.value, 0) === 0x002D ? 1 : 0; // U+002D HYPHEN-MINUS (-)

    // When written literally, an integer is one or more decimal digits 0 through 9 ...
    for (; i < token.value.length; i++) {
        if (!charCodeDefinitions.isDigit(charCodeAt(token.value, i))) {
            return 0;
        }
    }

    // check range if specified
    if (outOfRange(opts, token.value, i)) {
        return 0;
    }

    return 1;
}

const genericSyntaxes = {
    // token types
    'ident-token': tokenType(types.Ident),
    'function-token': tokenType(types.Function),
    'at-keyword-token': tokenType(types.AtKeyword),
    'hash-token': tokenType(types.Hash),
    'string-token': tokenType(types.String),
    'bad-string-token': tokenType(types.BadString),
    'url-token': tokenType(types.Url),
    'bad-url-token': tokenType(types.BadUrl),
    'delim-token': tokenType(types.Delim),
    'number-token': tokenType(types.Number),
    'percentage-token': tokenType(types.Percentage),
    'dimension-token': tokenType(types.Dimension),
    'whitespace-token': tokenType(types.WhiteSpace),
    'CDO-token': tokenType(types.CDO),
    'CDC-token': tokenType(types.CDC),
    'colon-token': tokenType(types.Colon),
    'semicolon-token': tokenType(types.Semicolon),
    'comma-token': tokenType(types.Comma),
    '[-token': tokenType(types.LeftSquareBracket),
    ']-token': tokenType(types.RightSquareBracket),
    '(-token': tokenType(types.LeftParenthesis),
    ')-token': tokenType(types.RightParenthesis),
    '{-token': tokenType(types.LeftCurlyBracket),
    '}-token': tokenType(types.RightCurlyBracket),

    // token type aliases
    'string': tokenType(types.String),
    'ident': tokenType(types.Ident),

    // complex types
    'custom-ident': customIdent,
    'custom-property-name': customPropertyName,
    'hex-color': hexColor,
    'id-selector': idSelector, // element( <id-selector> )
    'an-plus-b': genericAnPlusB,
    'urange': genericUrange,
    'declaration-value': declarationValue,
    'any-value': anyValue,

    // dimensions
    'dimension': calc(dimension(null)),
    'angle': calc(dimension(ANGLE)),
    'decibel': calc(dimension(DECIBEL)),
    'frequency': calc(dimension(FREQUENCY)),
    'flex': calc(dimension(FLEX)),
    'length': calc(zero(dimension(LENGTH))),
    'resolution': calc(dimension(RESOLUTION)),
    'semitones': calc(dimension(SEMITONES)),
    'time': calc(dimension(TIME)),

    // percentage
    'percentage': calc(percentage),

    // numeric
    'zero': zero(),
    'number': calc(number),
    'integer': calc(integer),

    // old IE stuff
    '-ms-legacy-expression': func('expression')
};

module.exports = genericSyntaxes;


/***/ }),

/***/ 4352:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const parse = __webpack_require__(8544);

const MATCH = { type: 'Match' };
const MISMATCH = { type: 'Mismatch' };
const DISALLOW_EMPTY = { type: 'DisallowEmpty' };

const LEFTPARENTHESIS = 40;  // (
const RIGHTPARENTHESIS = 41; // )

function createCondition(match, thenBranch, elseBranch) {
    // reduce node count
    if (thenBranch === MATCH && elseBranch === MISMATCH) {
        return match;
    }

    if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) {
        return match;
    }

    if (match.type === 'If' && match.else === MISMATCH && thenBranch === MATCH) {
        thenBranch = match.then;
        match = match.match;
    }

    return {
        type: 'If',
        match,
        then: thenBranch,
        else: elseBranch
    };
}

function isFunctionType(name) {
    return (
        name.length > 2 &&
        name.charCodeAt(name.length - 2) === LEFTPARENTHESIS &&
        name.charCodeAt(name.length - 1) === RIGHTPARENTHESIS
    );
}

function isEnumCapatible(term) {
    return (
        term.type === 'Keyword' ||
        term.type === 'AtKeyword' ||
        term.type === 'Function' ||
        term.type === 'Type' && isFunctionType(term.name)
    );
}

function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
    switch (combinator) {
        case ' ': {
            // Juxtaposing components means that all of them must occur, in the given order.
            //
            // a b c
            // =
            // match a
            //   then match b
            //     then match c
            //       then MATCH
            //       else MISMATCH
            //     else MISMATCH
            //   else MISMATCH
            let result = MATCH;

            for (let i = terms.length - 1; i >= 0; i--) {
                const term = terms[i];

                result = createCondition(
                    term,
                    result,
                    MISMATCH
                );
            }
            return result;
        }

        case '|': {
            // A bar (|) separates two or more alternatives: exactly one of them must occur.
            //
            // a | b | c
            // =
            // match a
            //   then MATCH
            //   else match b
            //     then MATCH
            //     else match c
            //       then MATCH
            //       else MISMATCH

            let result = MISMATCH;
            let map = null;

            for (let i = terms.length - 1; i >= 0; i--) {
                let term = terms[i];

                // reduce sequence of keywords into a Enum
                if (isEnumCapatible(term)) {
                    if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
                        map = Object.create(null);
                        result = createCondition(
                            {
                                type: 'Enum',
                                map
                            },
                            MATCH,
                            result
                        );
                    }

                    if (map !== null) {
                        const key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
                        if (key in map === false) {
                            map[key] = term;
                            continue;
                        }
                    }
                }

                map = null;

                // create a new conditonal node
                result = createCondition(
                    term,
                    MATCH,
                    result
                );
            }
            return result;
        }

        case '&&': {
            // A double ampersand (&&) separates two or more components,
            // all of which must occur, in any order.

            // Use MatchOnce for groups with a large number of terms,
            // since &&-groups produces at least N!-node trees
            if (terms.length > 5) {
                return {
                    type: 'MatchOnce',
                    terms,
                    all: true
                };
            }

            // Use a combination tree for groups with small number of terms
            //
            // a && b && c
            // =
            // match a
            //   then [b && c]
            //   else match b
            //     then [a && c]
            //     else match c
            //       then [a && b]
            //       else MISMATCH
            //
            // a && b
            // =
            // match a
            //   then match b
            //     then MATCH
            //     else MISMATCH
            //   else match b
            //     then match a
            //       then MATCH
            //       else MISMATCH
            //     else MISMATCH
            let result = MISMATCH;

            for (let i = terms.length - 1; i >= 0; i--) {
                const term = terms[i];
                let thenClause;

                if (terms.length > 1) {
                    thenClause = buildGroupMatchGraph(
                        combinator,
                        terms.filter(function(newGroupTerm) {
                            return newGroupTerm !== term;
                        }),
                        false
                    );
                } else {
                    thenClause = MATCH;
                }

                result = createCondition(
                    term,
                    thenClause,
                    result
                );
            }
            return result;
        }

        case '||': {
            // A double bar (||) separates two or more options:
            // one or more of them must occur, in any order.

            // Use MatchOnce for groups with a large number of terms,
            // since ||-groups produces at least N!-node trees
            if (terms.length > 5) {
                return {
                    type: 'MatchOnce',
                    terms,
                    all: false
                };
            }

            // Use a combination tree for groups with small number of terms
            //
            // a || b || c
            // =
            // match a
            //   then [b || c]
            //   else match b
            //     then [a || c]
            //     else match c
            //       then [a || b]
            //       else MISMATCH
            //
            // a || b
            // =
            // match a
            //   then match b
            //     then MATCH
            //     else MATCH
            //   else match b
            //     then match a
            //       then MATCH
            //       else MATCH
            //     else MISMATCH
            let result = atLeastOneTermMatched ? MATCH : MISMATCH;

            for (let i = terms.length - 1; i >= 0; i--) {
                const term = terms[i];
                let thenClause;

                if (terms.length > 1) {
                    thenClause = buildGroupMatchGraph(
                        combinator,
                        terms.filter(function(newGroupTerm) {
                            return newGroupTerm !== term;
                        }),
                        true
                    );
                } else {
                    thenClause = MATCH;
                }

                result = createCondition(
                    term,
                    thenClause,
                    result
                );
            }
            return result;
        }
    }
}

function buildMultiplierMatchGraph(node) {
    let result = MATCH;
    let matchTerm = buildMatchGraphInternal(node.term);

    if (node.max === 0) {
        // disable repeating of empty match to prevent infinite loop
        matchTerm = createCondition(
            matchTerm,
            DISALLOW_EMPTY,
            MISMATCH
        );

        // an occurrence count is not limited, make a cycle;
        // to collect more terms on each following matching mismatch
        result = createCondition(
            matchTerm,
            null, // will be a loop
            MISMATCH
        );

        result.then = createCondition(
            MATCH,
            MATCH,
            result // make a loop
        );

        if (node.comma) {
            result.then.else = createCondition(
                { type: 'Comma', syntax: node },
                result,
                MISMATCH
            );
        }
    } else {
        // create a match node chain for [min .. max] interval with optional matches
        for (let i = node.min || 1; i <= node.max; i++) {
            if (node.comma && result !== MATCH) {
                result = createCondition(
                    { type: 'Comma', syntax: node },
                    result,
                    MISMATCH
                );
            }

            result = createCondition(
                matchTerm,
                createCondition(
                    MATCH,
                    MATCH,
                    result
                ),
                MISMATCH
            );
        }
    }

    if (node.min === 0) {
        // allow zero match
        result = createCondition(
            MATCH,
            MATCH,
            result
        );
    } else {
        // create a match node chain to collect [0 ... min - 1] required matches
        for (let i = 0; i < node.min - 1; i++) {
            if (node.comma && result !== MATCH) {
                result = createCondition(
                    { type: 'Comma', syntax: node },
                    result,
                    MISMATCH
                );
            }

            result = createCondition(
                matchTerm,
                result,
                MISMATCH
            );
        }
    }

    return result;
}

function buildMatchGraphInternal(node) {
    if (typeof node === 'function') {
        return {
            type: 'Generic',
            fn: node
        };
    }

    switch (node.type) {
        case 'Group': {
            let result = buildGroupMatchGraph(
                node.combinator,
                node.terms.map(buildMatchGraphInternal),
                false
            );

            if (node.disallowEmpty) {
                result = createCondition(
                    result,
                    DISALLOW_EMPTY,
                    MISMATCH
                );
            }

            return result;
        }

        case 'Multiplier':
            return buildMultiplierMatchGraph(node);

        case 'Type':
        case 'Property':
            return {
                type: node.type,
                name: node.name,
                syntax: node
            };

        case 'Keyword':
            return {
                type: node.type,
                name: node.name.toLowerCase(),
                syntax: node
            };

        case 'AtKeyword':
            return {
                type: node.type,
                name: '@' + node.name.toLowerCase(),
                syntax: node
            };

        case 'Function':
            return {
                type: node.type,
                name: node.name.toLowerCase() + '(',
                syntax: node
            };

        case 'String':
            // convert a one char length String to a Token
            if (node.value.length === 3) {
                return {
                    type: 'Token',
                    value: node.value.charAt(1),
                    syntax: node
                };
            }

            // otherwise use it as is
            return {
                type: node.type,
                value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, '\''),
                syntax: node
            };

        case 'Token':
            return {
                type: node.type,
                value: node.value,
                syntax: node
            };

        case 'Comma':
            return {
                type: node.type,
                syntax: node
            };

        default:
            throw new Error('Unknown node type:', node.type);
    }
}

function buildMatchGraph(syntaxTree, ref) {
    if (typeof syntaxTree === 'string') {
        syntaxTree = parse.parse(syntaxTree);
    }

    return {
        type: 'MatchGraph',
        match: buildMatchGraphInternal(syntaxTree),
        syntax: ref || null,
        source: syntaxTree
    };
}

exports.DISALLOW_EMPTY = DISALLOW_EMPTY;
exports.MATCH = MATCH;
exports.MISMATCH = MISMATCH;
exports.buildMatchGraph = buildMatchGraph;


/***/ }),

/***/ 3474:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const matchGraph = __webpack_require__(4352);
const types = __webpack_require__(4764);

const { hasOwnProperty } = Object.prototype;
const STUB = 0;
const TOKEN = 1;
const OPEN_SYNTAX = 2;
const CLOSE_SYNTAX = 3;

const EXIT_REASON_MATCH = 'Match';
const EXIT_REASON_MISMATCH = 'Mismatch';
const EXIT_REASON_ITERATION_LIMIT = 'Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)';

const ITERATION_LIMIT = 15000;

function reverseList(list) {
    let prev = null;
    let next = null;
    let item = list;

    while (item !== null) {
        next = item.prev;
        item.prev = prev;
        prev = item;
        item = next;
    }

    return prev;
}

function areStringsEqualCaseInsensitive(testStr, referenceStr) {
    if (testStr.length !== referenceStr.length) {
        return false;
    }

    for (let i = 0; i < testStr.length; i++) {
        const referenceCode = referenceStr.charCodeAt(i);
        let testCode = testStr.charCodeAt(i);

        // testCode.toLowerCase() for U+0041 LATIN CAPITAL LETTER A (A) .. U+005A LATIN CAPITAL LETTER Z (Z).
        if (testCode >= 0x0041 && testCode <= 0x005A) {
            testCode = testCode | 32;
        }

        if (testCode !== referenceCode) {
            return false;
        }
    }

    return true;
}

function isContextEdgeDelim(token) {
    if (token.type !== types.Delim) {
        return false;
    }

    // Fix matching for unicode-range: U+30??, U+FF00-FF9F
    // Probably we need to check out previous match instead
    return token.value !== '?';
}

function isCommaContextStart(token) {
    if (token === null) {
        return true;
    }

    return (
        token.type === types.Comma ||
        token.type === types.Function ||
        token.type === types.LeftParenthesis ||
        token.type === types.LeftSquareBracket ||
        token.type === types.LeftCurlyBracket ||
        isContextEdgeDelim(token)
    );
}

function isCommaContextEnd(token) {
    if (token === null) {
        return true;
    }

    return (
        token.type === types.RightParenthesis ||
        token.type === types.RightSquareBracket ||
        token.type === types.RightCurlyBracket ||
        token.type === types.Delim
    );
}

function internalMatch(tokens, state, syntaxes) {
    function moveToNextToken() {
        do {
            tokenIndex++;
            token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
        } while (token !== null && (token.type === types.WhiteSpace || token.type === types.Comment));
    }

    function getNextToken(offset) {
        const nextIndex = tokenIndex + offset;

        return nextIndex < tokens.length ? tokens[nextIndex] : null;
    }

    function stateSnapshotFromSyntax(nextState, prev) {
        return {
            nextState,
            matchStack,
            syntaxStack,
            thenStack,
            tokenIndex,
            prev
        };
    }

    function pushThenStack(nextState) {
        thenStack = {
            nextState,
            matchStack,
            syntaxStack,
            prev: thenStack
        };
    }

    function pushElseStack(nextState) {
        elseStack = stateSnapshotFromSyntax(nextState, elseStack);
    }

    function addTokenToMatch() {
        matchStack = {
            type: TOKEN,
            syntax: state.syntax,
            token,
            prev: matchStack
        };

        moveToNextToken();
        syntaxStash = null;

        if (tokenIndex > longestMatch) {
            longestMatch = tokenIndex;
        }
    }

    function openSyntax() {
        syntaxStack = {
            syntax: state.syntax,
            opts: state.syntax.opts || (syntaxStack !== null && syntaxStack.opts) || null,
            prev: syntaxStack
        };

        matchStack = {
            type: OPEN_SYNTAX,
            syntax: state.syntax,
            token: matchStack.token,
            prev: matchStack
        };
    }

    function closeSyntax() {
        if (matchStack.type === OPEN_SYNTAX) {
            matchStack = matchStack.prev;
        } else {
            matchStack = {
                type: CLOSE_SYNTAX,
                syntax: syntaxStack.syntax,
                token: matchStack.token,
                prev: matchStack
            };
        }

        syntaxStack = syntaxStack.prev;
    }

    let syntaxStack = null;
    let thenStack = null;
    let elseStack = null;

    // null – stashing allowed, nothing stashed
    // false – stashing disabled, nothing stashed
    // anithing else – fail stashable syntaxes, some syntax stashed
    let syntaxStash = null;

    let iterationCount = 0; // count iterations and prevent infinite loop
    let exitReason = null;

    let token = null;
    let tokenIndex = -1;
    let longestMatch = 0;
    let matchStack = {
        type: STUB,
        syntax: null,
        token: null,
        prev: null
    };

    moveToNextToken();

    while (exitReason === null && ++iterationCount < ITERATION_LIMIT) {
        // function mapList(list, fn) {
        //     const result = [];
        //     while (list) {
        //         result.unshift(fn(list));
        //         list = list.prev;
        //     }
        //     return result;
        // }
        // console.log('--\n',
        //     '#' + iterationCount,
        //     require('util').inspect({
        //         match: mapList(matchStack, x => x.type === TOKEN ? x.token && x.token.value : x.syntax ? ({ [OPEN_SYNTAX]: '<', [CLOSE_SYNTAX]: '</' }[x.type] || x.type) + '!' + x.syntax.name : null),
        //         token: token && token.value,
        //         tokenIndex,
        //         syntax: syntax.type + (syntax.id ? ' #' + syntax.id : '')
        //     }, { depth: null })
        // );
        switch (state.type) {
            case 'Match':
                if (thenStack === null) {
                    // turn to MISMATCH when some tokens left unmatched
                    if (token !== null) {
                        // doesn't mismatch if just one token left and it's an IE hack
                        if (tokenIndex !== tokens.length - 1 || (token.value !== '\\0' && token.value !== '\\9')) {
                            state = matchGraph.MISMATCH;
                            break;
                        }
                    }

                    // break the main loop, return a result - MATCH
                    exitReason = EXIT_REASON_MATCH;
                    break;
                }

                // go to next syntax (`then` branch)
                state = thenStack.nextState;

                // check match is not empty
                if (state === matchGraph.DISALLOW_EMPTY) {
                    if (thenStack.matchStack === matchStack) {
                        state = matchGraph.MISMATCH;
                        break;
                    } else {
                        state = matchGraph.MATCH;
                    }
                }

                // close syntax if needed
                while (thenStack.syntaxStack !== syntaxStack) {
                    closeSyntax();
                }

                // pop stack
                thenStack = thenStack.prev;
                break;

            case 'Mismatch':
                // when some syntax is stashed
                if (syntaxStash !== null && syntaxStash !== false) {
                    // there is no else branches or a branch reduce match stack
                    if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
                        // restore state from the stash
                        elseStack = syntaxStash;
                        syntaxStash = false; // disable stashing
                    }
                } else if (elseStack === null) {
                    // no else branches -> break the main loop
                    // return a result - MISMATCH
                    exitReason = EXIT_REASON_MISMATCH;
                    break;
                }

                // go to next syntax (`else` branch)
                state = elseStack.nextState;

                // restore all the rest stack states
                thenStack = elseStack.thenStack;
                syntaxStack = elseStack.syntaxStack;
                matchStack = elseStack.matchStack;
                tokenIndex = elseStack.tokenIndex;
                token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;

                // pop stack
                elseStack = elseStack.prev;
                break;

            case 'MatchGraph':
                state = state.match;
                break;

            case 'If':
                // IMPORTANT: else stack push must go first,
                // since it stores the state of thenStack before changes
                if (state.else !== matchGraph.MISMATCH) {
                    pushElseStack(state.else);
                }

                if (state.then !== matchGraph.MATCH) {
                    pushThenStack(state.then);
                }

                state = state.match;
                break;

            case 'MatchOnce':
                state = {
                    type: 'MatchOnceBuffer',
                    syntax: state,
                    index: 0,
                    mask: 0
                };
                break;

            case 'MatchOnceBuffer': {
                const terms = state.syntax.terms;

                if (state.index === terms.length) {
                    // no matches at all or it's required all terms to be matched
                    if (state.mask === 0 || state.syntax.all) {
                        state = matchGraph.MISMATCH;
                        break;
                    }

                    // a partial match is ok
                    state = matchGraph.MATCH;
                    break;
                }

                // all terms are matched
                if (state.mask === (1 << terms.length) - 1) {
                    state = matchGraph.MATCH;
                    break;
                }

                for (; state.index < terms.length; state.index++) {
                    const matchFlag = 1 << state.index;

                    if ((state.mask & matchFlag) === 0) {
                        // IMPORTANT: else stack push must go first,
                        // since it stores the state of thenStack before changes
                        pushElseStack(state);
                        pushThenStack({
                            type: 'AddMatchOnce',
                            syntax: state.syntax,
                            mask: state.mask | matchFlag
                        });

                        // match
                        state = terms[state.index++];
                        break;
                    }
                }
                break;
            }

            case 'AddMatchOnce':
                state = {
                    type: 'MatchOnceBuffer',
                    syntax: state.syntax,
                    index: 0,
                    mask: state.mask
                };
                break;

            case 'Enum':
                if (token !== null) {
                    let name = token.value.toLowerCase();

                    // drop \0 and \9 hack from keyword name
                    if (name.indexOf('\\') !== -1) {
                        name = name.replace(/\\[09].*$/, '');
                    }

                    if (hasOwnProperty.call(state.map, name)) {
                        state = state.map[name];
                        break;
                    }
                }

                state = matchGraph.MISMATCH;
                break;

            case 'Generic': {
                const opts = syntaxStack !== null ? syntaxStack.opts : null;
                const lastTokenIndex = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));

                if (!isNaN(lastTokenIndex) && lastTokenIndex > tokenIndex) {
                    while (tokenIndex < lastTokenIndex) {
                        addTokenToMatch();
                    }

                    state = matchGraph.MATCH;
                } else {
                    state = matchGraph.MISMATCH;
                }

                break;
            }

            case 'Type':
            case 'Property': {
                const syntaxDict = state.type === 'Type' ? 'types' : 'properties';
                const dictSyntax = hasOwnProperty.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;

                if (!dictSyntax || !dictSyntax.match) {
                    throw new Error(
                        'Bad syntax reference: ' +
                        (state.type === 'Type'
                            ? '<' + state.name + '>'
                            : '<\'' + state.name + '\'>')
                    );
                }

                // stash a syntax for types with low priority
                if (syntaxStash !== false && token !== null && state.type === 'Type') {
                    const lowPriorityMatching =
                        // https://drafts.csswg.org/css-values-4/#custom-idents
                        // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
                        // can only claim the keyword if no other unfulfilled production can claim it.
                        (state.name === 'custom-ident' && token.type === types.Ident) ||

                        // https://drafts.csswg.org/css-values-4/#lengths
                        // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
                        // it must parse as a <number>
                        (state.name === 'length' && token.value === '0');

                    if (lowPriorityMatching) {
                        if (syntaxStash === null) {
                            syntaxStash = stateSnapshotFromSyntax(state, elseStack);
                        }

                        state = matchGraph.MISMATCH;
                        break;
                    }
                }

                openSyntax();
                state = dictSyntax.match;
                break;
            }

            case 'Keyword': {
                const name = state.name;

                if (token !== null) {
                    let keywordName = token.value;

                    // drop \0 and \9 hack from keyword name
                    if (keywordName.indexOf('\\') !== -1) {
                        keywordName = keywordName.replace(/\\[09].*$/, '');
                    }

                    if (areStringsEqualCaseInsensitive(keywordName, name)) {
                        addTokenToMatch();
                        state = matchGraph.MATCH;
                        break;
                    }
                }

                state = matchGraph.MISMATCH;
                break;
            }

            case 'AtKeyword':
            case 'Function':
                if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
                    addTokenToMatch();
                    state = matchGraph.MATCH;
                    break;
                }

                state = matchGraph.MISMATCH;
                break;

            case 'Token':
                if (token !== null && token.value === state.value) {
                    addTokenToMatch();
                    state = matchGraph.MATCH;
                    break;
                }

                state = matchGraph.MISMATCH;
                break;

            case 'Comma':
                if (token !== null && token.type === types.Comma) {
                    if (isCommaContextStart(matchStack.token)) {
                        state = matchGraph.MISMATCH;
                    } else {
                        addTokenToMatch();
                        state = isCommaContextEnd(token) ? matchGraph.MISMATCH : matchGraph.MATCH;
                    }
                } else {
                    state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? matchGraph.MATCH : matchGraph.MISMATCH;
                }

                break;

            case 'String':
                let string = '';
                let lastTokenIndex = tokenIndex;

                for (; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) {
                    string += tokens[lastTokenIndex].value;
                }

                if (areStringsEqualCaseInsensitive(string, state.value)) {
                    while (tokenIndex < lastTokenIndex) {
                        addTokenToMatch();
                    }

                    state = matchGraph.MATCH;
                } else {
                    state = matchGraph.MISMATCH;
                }

                break;

            default:
                throw new Error('Unknown node type: ' + state.type);
        }
    }

    switch (exitReason) {
        case null:
            console.warn('[csstree-match] BREAK after ' + ITERATION_LIMIT + ' iterations');
            exitReason = EXIT_REASON_ITERATION_LIMIT;
            matchStack = null;
            break;

        case EXIT_REASON_MATCH:
            while (syntaxStack !== null) {
                closeSyntax();
            }
            break;

        default:
            matchStack = null;
    }

    return {
        tokens,
        reason: exitReason,
        iterations: iterationCount,
        match: matchStack,
        longestMatch
    };
}

function matchAsList(tokens, matchGraph, syntaxes) {
    const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

    if (matchResult.match !== null) {
        let item = reverseList(matchResult.match).prev;

        matchResult.match = [];

        while (item !== null) {
            switch (item.type) {
                case OPEN_SYNTAX:
                case CLOSE_SYNTAX:
                    matchResult.match.push({
                        type: item.type,
                        syntax: item.syntax
                    });
                    break;

                default:
                    matchResult.match.push({
                        token: item.token.value,
                        node: item.token.node
                    });
                    break;
            }

            item = item.prev;
        }
    }

    return matchResult;
}

function matchAsTree(tokens, matchGraph, syntaxes) {
    const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

    if (matchResult.match === null) {
        return matchResult;
    }

    let item = matchResult.match;
    let host = matchResult.match = {
        syntax: matchGraph.syntax || null,
        match: []
    };
    const hostStack = [host];

    // revert a list and start with 2nd item since 1st is a stub item
    item = reverseList(item).prev;

    // build a tree
    while (item !== null) {
        switch (item.type) {
            case OPEN_SYNTAX:
                host.match.push(host = {
                    syntax: item.syntax,
                    match: []
                });
                hostStack.push(host);
                break;

            case CLOSE_SYNTAX:
                hostStack.pop();
                host = hostStack[hostStack.length - 1];
                break;

            default:
                host.match.push({
                    syntax: item.syntax || null,
                    token: item.token.value,
                    node: item.token.node
                });
        }

        item = item.prev;
    }

    return matchResult;
}

exports.matchAsList = matchAsList;
exports.matchAsTree = matchAsTree;


/***/ }),

/***/ 7889:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const index = __webpack_require__(338);

const astToTokens = {
    decorator: function(handlers) {
        const tokens = [];
        let curNode = null;

        return {
            ...handlers,
            node(node) {
                const tmp = curNode;
                curNode = node;
                handlers.node.call(this, node);
                curNode = tmp;
            },
            emit(value, type, auto) {
                tokens.push({
                    type,
                    value,
                    node: auto ? null : curNode
                });
            },
            result() {
                return tokens;
            }
        };
    }
};

function stringToTokens(str) {
    const tokens = [];

    index.tokenize(str, (type, start, end) =>
        tokens.push({
            type,
            value: str.slice(start, end),
            node: null
        })
    );

    return tokens;
}

function prepareTokens(value, syntax) {
    if (typeof value === 'string') {
        return stringToTokens(value);
    }

    return syntax.generate(value, astToTokens);
}

module.exports = prepareTokens;


/***/ }),

/***/ 8152:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const List = __webpack_require__(2080);

function getFirstMatchNode(matchNode) {
    if ('node' in matchNode) {
        return matchNode.node;
    }

    return getFirstMatchNode(matchNode.match[0]);
}

function getLastMatchNode(matchNode) {
    if ('node' in matchNode) {
        return matchNode.node;
    }

    return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
}

function matchFragments(lexer, ast, match, type, name) {
    function findFragments(matchNode) {
        if (matchNode.syntax !== null &&
            matchNode.syntax.type === type &&
            matchNode.syntax.name === name) {
            const start = getFirstMatchNode(matchNode);
            const end = getLastMatchNode(matchNode);

            lexer.syntax.walk(ast, function(node, item, list) {
                if (node === start) {
                    const nodes = new List.List();

                    do {
                        nodes.appendData(item.data);

                        if (item.data === end) {
                            break;
                        }

                        item = item.next;
                    } while (item !== null);

                    fragments.push({
                        parent: list,
                        nodes
                    });
                }
            });
        }

        if (Array.isArray(matchNode.match)) {
            matchNode.match.forEach(findFragments);
        }
    }

    const fragments = [];

    if (match.matched !== null) {
        findFragments(match.matched);
    }

    return fragments;
}

exports.matchFragments = matchFragments;


/***/ }),

/***/ 91:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const List = __webpack_require__(2080);

const { hasOwnProperty } = Object.prototype;

function isValidNumber(value) {
    // Number.isInteger(value) && value >= 0
    return (
        typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value &&
        value >= 0
    );
}

function isValidLocation(loc) {
    return (
        Boolean(loc) &&
        isValidNumber(loc.offset) &&
        isValidNumber(loc.line) &&
        isValidNumber(loc.column)
    );
}

function createNodeStructureChecker(type, fields) {
    return function checkNode(node, warn) {
        if (!node || node.constructor !== Object) {
            return warn(node, 'Type of node should be an Object');
        }

        for (let key in node) {
            let valid = true;

            if (hasOwnProperty.call(node, key) === false) {
                continue;
            }

            if (key === 'type') {
                if (node.type !== type) {
                    warn(node, 'Wrong node type `' + node.type + '`, expected `' + type + '`');
                }
            } else if (key === 'loc') {
                if (node.loc === null) {
                    continue;
                } else if (node.loc && node.loc.constructor === Object) {
                    if (typeof node.loc.source !== 'string') {
                        key += '.source';
                    } else if (!isValidLocation(node.loc.start)) {
                        key += '.start';
                    } else if (!isValidLocation(node.loc.end)) {
                        key += '.end';
                    } else {
                        continue;
                    }
                }

                valid = false;
            } else if (fields.hasOwnProperty(key)) {
                valid = false;

                for (let i = 0; !valid && i < fields[key].length; i++) {
                    const fieldType = fields[key][i];

                    switch (fieldType) {
                        case String:
                            valid = typeof node[key] === 'string';
                            break;

                        case Boolean:
                            valid = typeof node[key] === 'boolean';
                            break;

                        case null:
                            valid = node[key] === null;
                            break;

                        default:
                            if (typeof fieldType === 'string') {
                                valid = node[key] && node[key].type === fieldType;
                            } else if (Array.isArray(fieldType)) {
                                valid = node[key] instanceof List.List;
                            }
                    }
                }
            } else {
                warn(node, 'Unknown field `' + key + '` for ' + type + ' node type');
            }

            if (!valid) {
                warn(node, 'Bad value for `' + type + '.' + key + '`');
            }
        }

        for (const key in fields) {
            if (hasOwnProperty.call(fields, key) &&
                hasOwnProperty.call(node, key) === false) {
                warn(node, 'Field `' + type + '.' + key + '` is missed');
            }
        }
    };
}

function processStructure(name, nodeType) {
    const structure = nodeType.structure;
    const fields = {
        type: String,
        loc: true
    };
    const docs = {
        type: '"' + name + '"'
    };

    for (const key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        const docsTypes = [];
        const fieldTypes = fields[key] = Array.isArray(structure[key])
            ? structure[key].slice()
            : [structure[key]];

        for (let i = 0; i < fieldTypes.length; i++) {
            const fieldType = fieldTypes[i];
            if (fieldType === String || fieldType === Boolean) {
                docsTypes.push(fieldType.name);
            } else if (fieldType === null) {
                docsTypes.push('null');
            } else if (typeof fieldType === 'string') {
                docsTypes.push('<' + fieldType + '>');
            } else if (Array.isArray(fieldType)) {
                docsTypes.push('List'); // TODO: use type enum
            } else {
                throw new Error('Wrong value `' + fieldType + '` in `' + name + '.' + key + '` structure definition');
            }
        }

        docs[key] = docsTypes.join(' | ');
    }

    return {
        docs,
        check: createNodeStructureChecker(name, fields)
    };
}

function getStructureFromConfig(config) {
    const structure = {};

    if (config.node) {
        for (const name in config.node) {
            if (hasOwnProperty.call(config.node, name)) {
                const nodeType = config.node[name];

                if (nodeType.structure) {
                    structure[name] = processStructure(name, nodeType);
                } else {
                    throw new Error('Missed `structure` field in `' + name + '` node type definition');
                }
            }
        }
    }

    return structure;
}

exports.getStructureFromConfig = getStructureFromConfig;


/***/ }),

/***/ 7991:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function getTrace(node) {
    function shouldPutToTrace(syntax) {
        if (syntax === null) {
            return false;
        }

        return (
            syntax.type === 'Type' ||
            syntax.type === 'Property' ||
            syntax.type === 'Keyword'
        );
    }

    function hasMatch(matchNode) {
        if (Array.isArray(matchNode.match)) {
            // use for-loop for better perfomance
            for (let i = 0; i < matchNode.match.length; i++) {
                if (hasMatch(matchNode.match[i])) {
                    if (shouldPutToTrace(matchNode.syntax)) {
                        result.unshift(matchNode.syntax);
                    }

                    return true;
                }
            }
        } else if (matchNode.node === node) {
            result = shouldPutToTrace(matchNode.syntax)
                ? [matchNode.syntax]
                : [];

            return true;
        }

        return false;
    }

    let result = null;

    if (this.matched !== null) {
        hasMatch(this.matched);
    }

    return result;
}

function isType(node, type) {
    return testNode(this, node, match => match.type === 'Type' && match.name === type);
}

function isProperty(node, property) {
    return testNode(this, node, match => match.type === 'Property' && match.name === property);
}

function isKeyword(node) {
    return testNode(this, node, match => match.type === 'Keyword');
}

function testNode(match, node, fn) {
    const trace = getTrace.call(match, node);

    if (trace === null) {
        return false;
    }

    return trace.some(fn);
}

exports.getTrace = getTrace;
exports.isKeyword = isKeyword;
exports.isProperty = isProperty;
exports.isType = isType;


/***/ }),

/***/ 7505:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const createCustomError = __webpack_require__(7324);

const MAX_LINE_LENGTH = 100;
const OFFSET_CORRECTION = 60;
const TAB_REPLACEMENT = '    ';

function sourceFragment({ source, line, column }, extraLines) {
    function processLines(start, end) {
        return lines
            .slice(start, end)
            .map((line, idx) =>
                String(start + idx + 1).padStart(maxNumLength) + ' |' + line
            ).join('\n');
    }

    const lines = source.split(/\r\n?|\n|\f/);
    const startLine = Math.max(1, line - extraLines) - 1;
    const endLine = Math.min(line + extraLines, lines.length + 1);
    const maxNumLength = Math.max(4, String(endLine).length) + 1;
    let cutLeft = 0;

    // column correction according to replaced tab before column
    column += (TAB_REPLACEMENT.length - 1) * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;

    if (column > MAX_LINE_LENGTH) {
        cutLeft = column - OFFSET_CORRECTION + 3;
        column = OFFSET_CORRECTION - 2;
    }

    for (let i = startLine; i <= endLine; i++) {
        if (i >= 0 && i < lines.length) {
            lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
            lines[i] =
                (cutLeft > 0 && lines[i].length > cutLeft ? '\u2026' : '') +
                lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) +
                (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? '\u2026' : '');
        }
    }

    return [
        processLines(startLine, line),
        new Array(column + maxNumLength + 2).join('-') + '^',
        processLines(line, endLine)
    ].filter(Boolean).join('\n');
}

function SyntaxError(message, source, offset, line, column) {
    const error = Object.assign(createCustomError.createCustomError('SyntaxError', message), {
        source,
        offset,
        line,
        column,
        sourceFragment(extraLines) {
            return sourceFragment({ source, line, column }, isNaN(extraLines) ? 0 : extraLines);
        },
        get formattedMessage() {
            return (
                `Parse error: ${message}\n` +
                sourceFragment({ source, line, column }, 2)
            );
        }
    });

    return error;
}

exports.SyntaxError = SyntaxError;


/***/ }),

/***/ 2499:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const List = __webpack_require__(2080);
const _SyntaxError = __webpack_require__(7505);
const index = __webpack_require__(338);
const sequence = __webpack_require__(4937);
const TokenStream = __webpack_require__(7989);
const utils = __webpack_require__(9708);
const types = __webpack_require__(4764);
const names = __webpack_require__(7169);
const OffsetToLocation = __webpack_require__(3591);

const NOOP = () => {};
const EXCLAMATIONMARK = 0x0021;  // U+0021 EXCLAMATION MARK (!)
const NUMBERSIGN = 0x0023;       // U+0023 NUMBER SIGN (#)
const SEMICOLON = 0x003B;        // U+003B SEMICOLON (;)
const LEFTCURLYBRACKET = 0x007B; // U+007B LEFT CURLY BRACKET ({)
const NULL = 0;

function createParseContext(name) {
    return function() {
        return this[name]();
    };
}

function fetchParseValues(dict) {
    const result = Object.create(null);

    for (const name in dict) {
        const item = dict[name];

        if (item.parse) {
            result[name] = item.parse;
        }
    }

    return result;
}

function processConfig(config) {
    const parseConfig = {
        context: Object.create(null),
        scope: Object.assign(Object.create(null), config.scope),
        atrule: fetchParseValues(config.atrule),
        pseudo: fetchParseValues(config.pseudo),
        node: fetchParseValues(config.node)
    };

    for (const name in config.parseContext) {
        switch (typeof config.parseContext[name]) {
            case 'function':
                parseConfig.context[name] = config.parseContext[name];
                break;

            case 'string':
                parseConfig.context[name] = createParseContext(config.parseContext[name]);
                break;
        }
    }

    return {
        config: parseConfig,
        ...parseConfig,
        ...parseConfig.node
    };
}

function createParser(config) {
    let source = '';
    let filename = '<unknown>';
    let needPositions = false;
    let onParseError = NOOP;
    let onParseErrorThrow = false;

    const locationMap = new OffsetToLocation.OffsetToLocation();
    const parser = Object.assign(new TokenStream.TokenStream(), processConfig(config || {}), {
        parseAtrulePrelude: true,
        parseRulePrelude: true,
        parseValue: true,
        parseCustomProperty: false,

        readSequence: sequence.readSequence,

        consumeUntilBalanceEnd: () => 0,
        consumeUntilLeftCurlyBracket(code) {
            return code === LEFTCURLYBRACKET ? 1 : 0;
        },
        consumeUntilLeftCurlyBracketOrSemicolon(code) {
            return code === LEFTCURLYBRACKET || code === SEMICOLON ? 1 : 0;
        },
        consumeUntilExclamationMarkOrSemicolon(code) {
            return code === EXCLAMATIONMARK || code === SEMICOLON ? 1 : 0;
        },
        consumeUntilSemicolonIncluded(code) {
            return code === SEMICOLON ? 2 : 0;
        },

        createList() {
            return new List.List();
        },
        createSingleNodeList(node) {
            return new List.List().appendData(node);
        },
        getFirstListNode(list) {
            return list && list.first;
        },
        getLastListNode(list) {
            return list && list.last;
        },

        parseWithFallback(consumer, fallback) {
            const startToken = this.tokenIndex;

            try {
                return consumer.call(this);
            } catch (e) {
                if (onParseErrorThrow) {
                    throw e;
                }

                const fallbackNode = fallback.call(this, startToken);

                onParseErrorThrow = true;
                onParseError(e, fallbackNode);
                onParseErrorThrow = false;

                return fallbackNode;
            }
        },

        lookupNonWSType(offset) {
            let type;

            do {
                type = this.lookupType(offset++);
                if (type !== types.WhiteSpace) {
                    return type;
                }
            } while (type !== NULL);

            return NULL;
        },

        charCodeAt(offset) {
            return offset >= 0 && offset < source.length ? source.charCodeAt(offset) : 0;
        },
        substring(offsetStart, offsetEnd) {
            return source.substring(offsetStart, offsetEnd);
        },
        substrToCursor(start) {
            return this.source.substring(start, this.tokenStart);
        },

        cmpChar(offset, charCode) {
            return utils.cmpChar(source, offset, charCode);
        },
        cmpStr(offsetStart, offsetEnd, str) {
            return utils.cmpStr(source, offsetStart, offsetEnd, str);
        },

        consume(tokenType) {
            const start = this.tokenStart;

            this.eat(tokenType);

            return this.substrToCursor(start);
        },
        consumeFunctionName() {
            const name = source.substring(this.tokenStart, this.tokenEnd - 1);

            this.eat(types.Function);

            return name;
        },
        consumeNumber(type) {
            const number = source.substring(this.tokenStart, utils.consumeNumber(source, this.tokenStart));

            this.eat(type);

            return number;
        },

        eat(tokenType) {
            if (this.tokenType !== tokenType) {
                const tokenName = names[tokenType].slice(0, -6).replace(/-/g, ' ').replace(/^./, m => m.toUpperCase());
                let message = `${/[[\](){}]/.test(tokenName) ? `"${tokenName}"` : tokenName} is expected`;
                let offset = this.tokenStart;

                // tweak message and offset
                switch (tokenType) {
                    case types.Ident:
                        // when identifier is expected but there is a function or url
                        if (this.tokenType === types.Function || this.tokenType === types.Url) {
                            offset = this.tokenEnd - 1;
                            message = 'Identifier is expected but function found';
                        } else {
                            message = 'Identifier is expected';
                        }
                        break;

                    case types.Hash:
                        if (this.isDelim(NUMBERSIGN)) {
                            this.next();
                            offset++;
                            message = 'Name is expected';
                        }
                        break;

                    case types.Percentage:
                        if (this.tokenType === types.Number) {
                            offset = this.tokenEnd;
                            message = 'Percent sign is expected';
                        }
                        break;
                }

                this.error(message, offset);
            }

            this.next();
        },
        eatIdent(name) {
            if (this.tokenType !== types.Ident || this.lookupValue(0, name) === false) {
                this.error(`Identifier "${name}" is expected`);
            }

            this.next();
        },
        eatDelim(code) {
            if (!this.isDelim(code)) {
                this.error(`Delim "${String.fromCharCode(code)}" is expected`);
            }

            this.next();
        },

        getLocation(start, end) {
            if (needPositions) {
                return locationMap.getLocationRange(
                    start,
                    end,
                    filename
                );
            }

            return null;
        },
        getLocationFromList(list) {
            if (needPositions) {
                const head = this.getFirstListNode(list);
                const tail = this.getLastListNode(list);
                return locationMap.getLocationRange(
                    head !== null ? head.loc.start.offset - locationMap.startOffset : this.tokenStart,
                    tail !== null ? tail.loc.end.offset - locationMap.startOffset : this.tokenStart,
                    filename
                );
            }

            return null;
        },

        error(message, offset) {
            const location = typeof offset !== 'undefined' && offset < source.length
                ? locationMap.getLocation(offset)
                : this.eof
                    ? locationMap.getLocation(utils.findWhiteSpaceStart(source, source.length - 1))
                    : locationMap.getLocation(this.tokenStart);

            throw new _SyntaxError.SyntaxError(
                message || 'Unexpected input',
                source,
                location.offset,
                location.line,
                location.column
            );
        }
    });

    const parse = function(source_, options) {
        source = source_;
        options = options || {};

        parser.setSource(source, index.tokenize);
        locationMap.setSource(
            source,
            options.offset,
            options.line,
            options.column
        );

        filename = options.filename || '<unknown>';
        needPositions = Boolean(options.positions);
        onParseError = typeof options.onParseError === 'function' ? options.onParseError : NOOP;
        onParseErrorThrow = false;

        parser.parseAtrulePrelude = 'parseAtrulePrelude' in options ? Boolean(options.parseAtrulePrelude) : true;
        parser.parseRulePrelude = 'parseRulePrelude' in options ? Boolean(options.parseRulePrelude) : true;
        parser.parseValue = 'parseValue' in options ? Boolean(options.parseValue) : true;
        parser.parseCustomProperty = 'parseCustomProperty' in options ? Boolean(options.parseCustomProperty) : false;

        const { context = 'default', onComment } = options;

        if (context in parser.context === false) {
            throw new Error('Unknown context `' + context + '`');
        }

        if (typeof onComment === 'function') {
            parser.forEachToken((type, start, end) => {
                if (type === types.Comment) {
                    const loc = parser.getLocation(start, end);
                    const value = utils.cmpStr(source, end - 2, end, '*/')
                        ? source.slice(start + 2, end - 2)
                        : source.slice(start + 2, end);

                    onComment(value, loc);
                }
            });
        }

        const ast = parser.context[context].call(parser, options);

        if (!parser.eof) {
            parser.error();
        }

        return ast;
    };

    return Object.assign(parse, {
        SyntaxError: _SyntaxError.SyntaxError,
        config: parser.config
    });
}

exports.createParser = createParser;


/***/ }),

/***/ 4937:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

function readSequence(recognizer) {
    const children = this.createList();
    let space = false;
    const context = {
        recognizer
    };

    while (!this.eof) {
        switch (this.tokenType) {
            case types.Comment:
                this.next();
                continue;

            case types.WhiteSpace:
                space = true;
                this.next();
                continue;
        }

        let child = recognizer.getNode.call(this, context);

        if (child === undefined) {
            break;
        }

        if (space) {
            if (recognizer.onWhiteSpace) {
                recognizer.onWhiteSpace.call(this, child, children, context);
            }
            space = false;
        }

        children.push(child);
    }

    if (space && recognizer.onWhiteSpace) {
        recognizer.onWhiteSpace.call(this, null, children, context);
    }

    return children;
}

exports.readSequence = readSequence;


/***/ }),

/***/ 3836:
/***/ ((module) => {

"use strict";


const fontFace = {
    parse: {
        prelude: null,
        block() {
            return this.Block(true);
        }
    }
};

module.exports = fontFace;


/***/ }),

/***/ 4596:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const importAtrule = {
    parse: {
        prelude() {
            const children = this.createList();

            this.skipSC();

            switch (this.tokenType) {
                case types.String:
                    children.push(this.String());
                    break;

                case types.Url:
                case types.Function:
                    children.push(this.Url());
                    break;

                default:
                    this.error('String or url() is expected');
            }

            if (this.lookupNonWSType(0) === types.Ident ||
                this.lookupNonWSType(0) === types.LeftParenthesis) {
                children.push(this.MediaQueryList());
            }

            return children;
        },
        block: null
    }
};

module.exports = importAtrule;


/***/ }),

/***/ 3117:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fontFace = __webpack_require__(3836);
const _import = __webpack_require__(4596);
const media = __webpack_require__(9900);
const page = __webpack_require__(4435);
const supports = __webpack_require__(3931);

const atrule = {
    'font-face': fontFace,
    'import': _import,
    media,
    page,
    supports
};

module.exports = atrule;


/***/ }),

/***/ 9900:
/***/ ((module) => {

"use strict";


const media = {
    parse: {
        prelude() {
            return this.createSingleNodeList(
                this.MediaQueryList()
            );
        },
        block() {
            return this.Block(false);
        }
    }
};

module.exports = media;


/***/ }),

/***/ 4435:
/***/ ((module) => {

"use strict";


const page = {
    parse: {
        prelude() {
            return this.createSingleNodeList(
                this.SelectorList()
            );
        },
        block() {
            return this.Block(true);
        }
    }
};

module.exports = page;


/***/ }),

/***/ 3931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

function consumeRaw() {
    return this.createSingleNodeList(
        this.Raw(this.tokenIndex, null, false)
    );
}

function parentheses() {
    this.skipSC();

    if (this.tokenType === types.Ident &&
        this.lookupNonWSType(1) === types.Colon) {
        return this.createSingleNodeList(
            this.Declaration()
        );
    }

    return readSequence.call(this);
}

function readSequence() {
    const children = this.createList();
    let child;

    this.skipSC();

    scan:
    while (!this.eof) {
        switch (this.tokenType) {
            case types.Comment:
            case types.WhiteSpace:
                this.next();
                continue;

            case types.Function:
                child = this.Function(consumeRaw, this.scope.AtrulePrelude);
                break;

            case types.Ident:
                child = this.Identifier();
                break;

            case types.LeftParenthesis:
                child = this.Parentheses(parentheses, this.scope.AtrulePrelude);
                break;

            default:
                break scan;
        }

        children.push(child);
    }

    return children;
}

const supports = {
    parse: {
        prelude() {
            const children = readSequence.call(this);

            if (this.getFirstListNode(children) === null) {
                this.error('Condition is expected');
            }

            return children;
        },
        block() {
            return this.Block(false);
        }
    }
};

module.exports = supports;


/***/ }),

/***/ 2035:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const data = __webpack_require__(4743);
const index = __webpack_require__(9162);

const lexerConfig = {
    generic: true,
    ...data,
    node: index
};

module.exports = lexerConfig;


/***/ }),

/***/ 3163:
/***/ ((module) => {

"use strict";


const { hasOwnProperty } = Object.prototype;
const shape = {
    generic: true,
    types: appendOrAssign,
    atrules: {
        prelude: appendOrAssignOrNull,
        descriptors: appendOrAssignOrNull
    },
    properties: appendOrAssign,
    parseContext: assign,
    scope: deepAssign,
    atrule: ['parse'],
    pseudo: ['parse'],
    node: ['name', 'structure', 'parse', 'generate', 'walkContext']
};

function isObject(value) {
    return value && value.constructor === Object;
}

function copy(value) {
    return isObject(value)
        ? { ...value }
        : value;
}

function assign(dest, src) {
    return Object.assign(dest, src);
}

function deepAssign(dest, src) {
    for (const key in src) {
        if (hasOwnProperty.call(src, key)) {
            if (isObject(dest[key])) {
                deepAssign(dest[key], copy(src[key]));
            } else {
                dest[key] = copy(src[key]);
            }
        }
    }

    return dest;
}

function append(a, b) {
    if (typeof b === 'string' && /^\s*\|/.test(b)) {
        return typeof a === 'string'
            ? a + b
            : b.replace(/^\s*\|\s*/, '');
    }

    return b || null;
}

function appendOrAssign(a, b) {
    if (typeof b === 'string') {
        return append(a, b);
    }

    const result = { ...a };
    for (let key in b) {
        if (hasOwnProperty.call(b, key)) {
            result[key] = append(hasOwnProperty.call(a, key) ? a[key] : undefined, b[key]);
        }
    }

    return result;
}

function appendOrAssignOrNull(a, b) {
    const result = appendOrAssign(a, b);

    return !isObject(result) || Object.keys(result).length
        ? result
        : null;
}

function mix(dest, src, shape) {
    for (const key in shape) {
        if (hasOwnProperty.call(shape, key) === false) {
            continue;
        }

        if (shape[key] === true) {
            if (key in src) {
                if (hasOwnProperty.call(src, key)) {
                    dest[key] = copy(src[key]);
                }
            }
        } else if (shape[key]) {
            if (typeof shape[key] === 'function') {
                const fn = shape[key];
                dest[key] = fn({}, dest[key]);
                dest[key] = fn(dest[key] || {}, src[key]);
            } else if (isObject(shape[key])) {
                const result = {};

                for (let name in dest[key]) {
                    result[name] = mix({}, dest[key][name], shape[key]);
                }

                for (let name in src[key]) {
                    result[name] = mix(result[name] || {}, src[key][name], shape[key]);
                }

                dest[key] = result;
            } else if (Array.isArray(shape[key])) {
                const res = {};
                const innerShape = shape[key].reduce(function(s, k) {
                    s[k] = true;
                    return s;
                }, {});

                for (const [name, value] of Object.entries(dest[key] || {})) {
                    res[name] = {};
                    if (value) {
                        mix(res[name], value, innerShape);
                    }
                }

                for (const name in src[key]) {
                    if (hasOwnProperty.call(src[key], name)) {
                        if (!res[name]) {
                            res[name] = {};
                        }

                        if (src[key] && src[key][name]) {
                            mix(res[name], src[key][name], innerShape);
                        }
                    }
                }

                dest[key] = res;
            }
        }
    }
    return dest;
}

const mix$1 = (dest, src) => mix(dest, src, shape);

module.exports = mix$1;


/***/ }),

/***/ 9942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const index = __webpack_require__(25);
const index$1 = __webpack_require__(3117);
const index$2 = __webpack_require__(9585);
const index$3 = __webpack_require__(9162);

const config = {
    parseContext: {
        default: 'StyleSheet',
        stylesheet: 'StyleSheet',
        atrule: 'Atrule',
        atrulePrelude: function(options) {
            return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
        },
        mediaQueryList: 'MediaQueryList',
        mediaQuery: 'MediaQuery',
        rule: 'Rule',
        selectorList: 'SelectorList',
        selector: 'Selector',
        block: function() {
            return this.Block(true);
        },
        declarationList: 'DeclarationList',
        declaration: 'Declaration',
        value: 'Value'
    },
    scope: index,
    atrule: index$1,
    pseudo: index$2,
    node: index$3
};

module.exports = config;


/***/ }),

/***/ 485:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const index = __webpack_require__(9162);

const config = {
    node: index
};

module.exports = config;


/***/ }),

/***/ 3547:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const index = __webpack_require__(338);
const create = __webpack_require__(2499);
const create$2 = __webpack_require__(9074);
const create$3 = __webpack_require__(8348);
const create$1 = __webpack_require__(2850);
const Lexer = __webpack_require__(2636);
const mix = __webpack_require__(3163);

function createSyntax(config) {
    const parse = create.createParser(config);
    const walk = create$1.createWalker(config);
    const generate = create$2.createGenerator(config);
    const { fromPlainObject, toPlainObject } = create$3.createConvertor(walk);

    const syntax = {
        lexer: null,
        createLexer: config => new Lexer.Lexer(config, syntax, syntax.lexer.structure),

        tokenize: index.tokenize,
        parse,
        generate,

        walk,
        find: walk.find,
        findLast: walk.findLast,
        findAll: walk.findAll,

        fromPlainObject,
        toPlainObject,

        fork(extension) {
            const base = mix({}, config); // copy of config

            return createSyntax(
                typeof extension === 'function'
                    ? extension(base, Object.assign)
                    : mix(base, extension)
            );
        }
    };

    syntax.lexer = new Lexer.Lexer({
        generic: true,
        types: config.types,
        atrules: config.atrules,
        properties: config.properties,
        node: config.node
    }, syntax);

    return syntax;
}
const createSyntax$1 = config => createSyntax(mix({}, config));

module.exports = createSyntax$1;


/***/ }),

/***/ 9470:
/***/ ((module) => {

"use strict";


// legacy IE function
// expression( <any-value> )
function expressionFn() {
    return this.createSingleNodeList(
        this.Raw(this.tokenIndex, null, false)
    );
}

module.exports = expressionFn;


/***/ }),

/***/ 5139:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

// var( <ident> , <value>? )
function varFn() {
    const children = this.createList();

    this.skipSC();

    // NOTE: Don't check more than a first argument is an ident, rest checks are for lexer
    children.push(this.Identifier());

    this.skipSC();

    if (this.tokenType === types.Comma) {
        children.push(this.Operator());

        const startIndex = this.tokenIndex;
        const value = this.parseCustomProperty
            ? this.Value(null)
            : this.Raw(this.tokenIndex, this.consumeUntilExclamationMarkOrSemicolon, false);

        if (value.type === 'Value' && value.children.isEmpty) {
            for (let offset = startIndex - this.tokenIndex; offset <= 0; offset++) {
                if (this.lookupType(offset) === types.WhiteSpace) {
                    value.children.appendData({
                        type: 'WhiteSpace',
                        loc: null,
                        value: ' '
                    });
                    break;
                }
            }
        }

        children.push(value);
    }

    return children;
}

module.exports = varFn;


/***/ }),

/***/ 4393:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const create = __webpack_require__(3547);
const lexer = __webpack_require__(2035);
const parser = __webpack_require__(9942);
const walker = __webpack_require__(485);

const syntax = create({
    ...lexer,
    ...parser,
    ...walker
});

module.exports = syntax;


/***/ }),

/***/ 8443:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
const charCodeDefinitions = __webpack_require__(7154);

const PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
const N = 0x006E;           // U+006E LATIN SMALL LETTER N (n)
const DISALLOW_SIGN = true;
const ALLOW_SIGN = false;

function checkInteger(offset, disallowSign) {
    let pos = this.tokenStart + offset;
    const code = this.charCodeAt(pos);

    if (code === PLUSSIGN || code === HYPHENMINUS) {
        if (disallowSign) {
            this.error('Number sign is not allowed');
        }
        pos++;
    }

    for (; pos < this.tokenEnd; pos++) {
        if (!charCodeDefinitions.isDigit(this.charCodeAt(pos))) {
            this.error('Integer is expected', pos);
        }
    }
}

function checkTokenIsInteger(disallowSign) {
    return checkInteger.call(this, 0, disallowSign);
}

function expectCharCode(offset, code) {
    if (!this.cmpChar(this.tokenStart + offset, code)) {
        let msg = '';

        switch (code) {
            case N:
                msg = 'N is expected';
                break;
            case HYPHENMINUS:
                msg = 'HyphenMinus is expected';
                break;
        }

        this.error(msg, this.tokenStart + offset);
    }
}

// ... <signed-integer>
// ... ['+' | '-'] <signless-integer>
function consumeB() {
    let offset = 0;
    let sign = 0;
    let type = this.tokenType;

    while (type === types.WhiteSpace || type === types.Comment) {
        type = this.lookupType(++offset);
    }

    if (type !== types.Number) {
        if (this.isDelim(PLUSSIGN, offset) ||
            this.isDelim(HYPHENMINUS, offset)) {
            sign = this.isDelim(PLUSSIGN, offset) ? PLUSSIGN : HYPHENMINUS;

            do {
                type = this.lookupType(++offset);
            } while (type === types.WhiteSpace || type === types.Comment);

            if (type !== types.Number) {
                this.skip(offset);
                checkTokenIsInteger.call(this, DISALLOW_SIGN);
            }
        } else {
            return null;
        }
    }

    if (offset > 0) {
        this.skip(offset);
    }

    if (sign === 0) {
        type = this.charCodeAt(this.tokenStart);
        if (type !== PLUSSIGN && type !== HYPHENMINUS) {
            this.error('Number sign is expected');
        }
    }

    checkTokenIsInteger.call(this, sign !== 0);
    return sign === HYPHENMINUS ? '-' + this.consume(types.Number) : this.consume(types.Number);
}

// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
const name = 'AnPlusB';
const structure = {
    a: [String, null],
    b: [String, null]
};

function parse() {
    /* eslint-disable brace-style*/
    const start = this.tokenStart;
    let a = null;
    let b = null;

    // <integer>
    if (this.tokenType === types.Number) {
        checkTokenIsInteger.call(this, ALLOW_SIGN);
        b = this.consume(types.Number);
    }

    // -n
    // -n <signed-integer>
    // -n ['+' | '-'] <signless-integer>
    // -n- <signless-integer>
    // <dashndashdigit-ident>
    else if (this.tokenType === types.Ident && this.cmpChar(this.tokenStart, HYPHENMINUS)) {
        a = '-1';

        expectCharCode.call(this, 1, N);

        switch (this.tokenEnd - this.tokenStart) {
            // -n
            // -n <signed-integer>
            // -n ['+' | '-'] <signless-integer>
            case 2:
                this.next();
                b = consumeB.call(this);
                break;

            // -n- <signless-integer>
            case 3:
                expectCharCode.call(this, 2, HYPHENMINUS);

                this.next();
                this.skipSC();

                checkTokenIsInteger.call(this, DISALLOW_SIGN);

                b = '-' + this.consume(types.Number);
                break;

            // <dashndashdigit-ident>
            default:
                expectCharCode.call(this, 2, HYPHENMINUS);
                checkInteger.call(this, 3, DISALLOW_SIGN);
                this.next();

                b = this.substrToCursor(start + 2);
        }
    }

    // '+'? n
    // '+'? n <signed-integer>
    // '+'? n ['+' | '-'] <signless-integer>
    // '+'? n- <signless-integer>
    // '+'? <ndashdigit-ident>
    else if (this.tokenType === types.Ident || (this.isDelim(PLUSSIGN) && this.lookupType(1) === types.Ident)) {
        let sign = 0;
        a = '1';

        // just ignore a plus
        if (this.isDelim(PLUSSIGN)) {
            sign = 1;
            this.next();
        }

        expectCharCode.call(this, 0, N);

        switch (this.tokenEnd - this.tokenStart) {
            // '+'? n
            // '+'? n <signed-integer>
            // '+'? n ['+' | '-'] <signless-integer>
            case 1:
                this.next();
                b = consumeB.call(this);
                break;

            // '+'? n- <signless-integer>
            case 2:
                expectCharCode.call(this, 1, HYPHENMINUS);

                this.next();
                this.skipSC();

                checkTokenIsInteger.call(this, DISALLOW_SIGN);

                b = '-' + this.consume(types.Number);
                break;

            // '+'? <ndashdigit-ident>
            default:
                expectCharCode.call(this, 1, HYPHENMINUS);
                checkInteger.call(this, 2, DISALLOW_SIGN);
                this.next();

                b = this.substrToCursor(start + sign + 1);
        }
    }

    // <ndashdigit-dimension>
    // <ndash-dimension> <signless-integer>
    // <n-dimension>
    // <n-dimension> <signed-integer>
    // <n-dimension> ['+' | '-'] <signless-integer>
    else if (this.tokenType === types.Dimension) {
        const code = this.charCodeAt(this.tokenStart);
        const sign = code === PLUSSIGN || code === HYPHENMINUS;
        let i = this.tokenStart + sign;

        for (; i < this.tokenEnd; i++) {
            if (!charCodeDefinitions.isDigit(this.charCodeAt(i))) {
                break;
            }
        }

        if (i === this.tokenStart + sign) {
            this.error('Integer is expected', this.tokenStart + sign);
        }

        expectCharCode.call(this, i - this.tokenStart, N);
        a = this.substring(start, i);

        // <n-dimension>
        // <n-dimension> <signed-integer>
        // <n-dimension> ['+' | '-'] <signless-integer>
        if (i + 1 === this.tokenEnd) {
            this.next();
            b = consumeB.call(this);
        } else {
            expectCharCode.call(this, i - this.tokenStart + 1, HYPHENMINUS);

            // <ndash-dimension> <signless-integer>
            if (i + 2 === this.tokenEnd) {
                this.next();
                this.skipSC();
                checkTokenIsInteger.call(this, DISALLOW_SIGN);
                b = '-' + this.consume(types.Number);
            }
            // <ndashdigit-dimension>
            else {
                checkInteger.call(this, i - this.tokenStart + 2, DISALLOW_SIGN);
                this.next();
                b = this.substrToCursor(i + 1);
            }
        }
    } else {
        this.error();
    }

    if (a !== null && a.charCodeAt(0) === PLUSSIGN) {
        a = a.substr(1);
    }

    if (b !== null && b.charCodeAt(0) === PLUSSIGN) {
        b = b.substr(1);
    }

    return {
        type: 'AnPlusB',
        loc: this.getLocation(start, this.tokenStart),
        a,
        b
    };
}

function generate(node) {
    if (node.a) {
        const a =
            node.a === '+1' && 'n' ||
            node.a ===  '1' && 'n' ||
            node.a === '-1' && '-n' ||
            node.a + 'n';

        if (node.b) {
            const b = node.b[0] === '-' || node.b[0] === '+'
                ? node.b
                : '+' + node.b;
            this.tokenize(a + b);
        } else {
            this.tokenize(a);
        }
    } else {
        this.tokenize(node.b);
    }
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 6071:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

function consumeRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilLeftCurlyBracketOrSemicolon, true);
}

function isDeclarationBlockAtrule() {
    for (let offset = 1, type; type = this.lookupType(offset); offset++) {
        if (type === types.RightCurlyBracket) {
            return true;
        }

        if (type === types.LeftCurlyBracket ||
            type === types.AtKeyword) {
            return false;
        }
    }

    return false;
}


const name = 'Atrule';
const walkContext = 'atrule';
const structure = {
    name: String,
    prelude: ['AtrulePrelude', 'Raw', null],
    block: ['Block', null]
};

function parse() {
    const start = this.tokenStart;
    let name;
    let nameLowerCase;
    let prelude = null;
    let block = null;

    this.eat(types.AtKeyword);

    name = this.substrToCursor(start + 1);
    nameLowerCase = name.toLowerCase();
    this.skipSC();

    // parse prelude
    if (this.eof === false &&
        this.tokenType !== types.LeftCurlyBracket &&
        this.tokenType !== types.Semicolon) {
        if (this.parseAtrulePrelude) {
            prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name), consumeRaw);
        } else {
            prelude = consumeRaw.call(this, this.tokenIndex);
        }

        this.skipSC();
    }

    switch (this.tokenType) {
        case types.Semicolon:
            this.next();
            break;

        case types.LeftCurlyBracket:
            if (hasOwnProperty.call(this.atrule, nameLowerCase) &&
                typeof this.atrule[nameLowerCase].block === 'function') {
                block = this.atrule[nameLowerCase].block.call(this);
            } else {
                // TODO: should consume block content as Raw?
                block = this.Block(isDeclarationBlockAtrule.call(this));
            }

            break;
    }

    return {
        type: 'Atrule',
        loc: this.getLocation(start, this.tokenStart),
        name,
        prelude,
        block
    };
}

function generate(node) {
    this.token(types.AtKeyword, '@' + node.name);

    if (node.prelude !== null) {
        this.node(node.prelude);
    }

    if (node.block) {
        this.node(node.block);
    } else {
        this.token(types.Semicolon, ';');
    }
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 5275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'AtrulePrelude';
const walkContext = 'atrulePrelude';
const structure = {
    children: [[]]
};

function parse(name) {
    let children = null;

    if (name !== null) {
        name = name.toLowerCase();
    }

    this.skipSC();

    if (hasOwnProperty.call(this.atrule, name) &&
        typeof this.atrule[name].prelude === 'function') {
        // custom consumer
        children = this.atrule[name].prelude.call(this);
    } else {
        // default consumer
        children = this.readSequence(this.scope.AtrulePrelude);
    }

    this.skipSC();

    if (this.eof !== true &&
        this.tokenType !== types.LeftCurlyBracket &&
        this.tokenType !== types.Semicolon) {
        this.error('Semicolon or block is expected');
    }

    return {
        type: 'AtrulePrelude',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 6458:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const DOLLARSIGN = 0x0024;       // U+0024 DOLLAR SIGN ($)
const ASTERISK = 0x002A;         // U+002A ASTERISK (*)
const EQUALSSIGN = 0x003D;       // U+003D EQUALS SIGN (=)
const CIRCUMFLEXACCENT = 0x005E; // U+005E (^)
const VERTICALLINE = 0x007C;     // U+007C VERTICAL LINE (|)
const TILDE = 0x007E;            // U+007E TILDE (~)

function getAttributeName() {
    if (this.eof) {
        this.error('Unexpected end of input');
    }

    const start = this.tokenStart;
    let expectIdent = false;

    if (this.isDelim(ASTERISK)) {
        expectIdent = true;
        this.next();
    } else if (!this.isDelim(VERTICALLINE)) {
        this.eat(types.Ident);
    }

    if (this.isDelim(VERTICALLINE)) {
        if (this.charCodeAt(this.tokenStart + 1) !== EQUALSSIGN) {
            this.next();
            this.eat(types.Ident);
        } else if (expectIdent) {
            this.error('Identifier is expected', this.tokenEnd);
        }
    } else if (expectIdent) {
        this.error('Vertical line is expected');
    }

    return {
        type: 'Identifier',
        loc: this.getLocation(start, this.tokenStart),
        name: this.substrToCursor(start)
    };
}

function getOperator() {
    const start = this.tokenStart;
    const code = this.charCodeAt(start);

    if (code !== EQUALSSIGN &&        // =
        code !== TILDE &&             // ~=
        code !== CIRCUMFLEXACCENT &&  // ^=
        code !== DOLLARSIGN &&        // $=
        code !== ASTERISK &&          // *=
        code !== VERTICALLINE         // |=
    ) {
        this.error('Attribute selector (=, ~=, ^=, $=, *=, |=) is expected');
    }

    this.next();

    if (code !== EQUALSSIGN) {
        if (!this.isDelim(EQUALSSIGN)) {
            this.error('Equal sign is expected');
        }

        this.next();
    }

    return this.substrToCursor(start);
}

// '[' <wq-name> ']'
// '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'
const name = 'AttributeSelector';
const structure = {
    name: 'Identifier',
    matcher: [String, null],
    value: ['String', 'Identifier', null],
    flags: [String, null]
};

function parse() {
    const start = this.tokenStart;
    let name;
    let matcher = null;
    let value = null;
    let flags = null;

    this.eat(types.LeftSquareBracket);
    this.skipSC();

    name = getAttributeName.call(this);
    this.skipSC();

    if (this.tokenType !== types.RightSquareBracket) {
        // avoid case `[name i]`
        if (this.tokenType !== types.Ident) {
            matcher = getOperator.call(this);

            this.skipSC();

            value = this.tokenType === types.String
                ? this.String()
                : this.Identifier();

            this.skipSC();
        }

        // attribute flags
        if (this.tokenType === types.Ident) {
            flags = this.consume(types.Ident);

            this.skipSC();
        }
    }

    this.eat(types.RightSquareBracket);

    return {
        type: 'AttributeSelector',
        loc: this.getLocation(start, this.tokenStart),
        name,
        matcher,
        value,
        flags
    };
}

function generate(node) {
    this.token(types.Delim, '[');
    this.node(node.name);

    if (node.matcher !== null) {
        this.tokenize(node.matcher);
        this.node(node.value);
    }

    if (node.flags !== null) {
        this.token(types.Ident, node.flags);
    }

    this.token(types.Delim, ']');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 7434:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

function consumeRaw(startToken) {
    return this.Raw(startToken, null, true);
}
function consumeRule() {
    return this.parseWithFallback(this.Rule, consumeRaw);
}
function consumeRawDeclaration(startToken) {
    return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true);
}
function consumeDeclaration() {
    if (this.tokenType === types.Semicolon) {
        return consumeRawDeclaration.call(this, this.tokenIndex);
    }

    const node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);

    if (this.tokenType === types.Semicolon) {
        this.next();
    }

    return node;
}

const name = 'Block';
const walkContext = 'block';
const structure = {
    children: [[
        'Atrule',
        'Rule',
        'Declaration'
    ]]
};

function parse(isDeclaration) {
    const consumer = isDeclaration ? consumeDeclaration : consumeRule;
    const start = this.tokenStart;
    let children = this.createList();

    this.eat(types.LeftCurlyBracket);

    scan:
    while (!this.eof) {
        switch (this.tokenType) {
            case types.RightCurlyBracket:
                break scan;

            case types.WhiteSpace:
            case types.Comment:
                this.next();
                break;

            case types.AtKeyword:
                children.push(this.parseWithFallback(this.Atrule, consumeRaw));
                break;

            default:
                children.push(consumer.call(this));
        }
    }

    if (!this.eof) {
        this.eat(types.RightCurlyBracket);
    }

    return {
        type: 'Block',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.token(types.LeftCurlyBracket, '{');
    this.children(node, prev => {
        if (prev.type === 'Declaration') {
            this.token(types.Semicolon, ';');
        }
    });
    this.token(types.RightCurlyBracket, '}');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 4192:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Brackets';
const structure = {
    children: [[]]
};

function parse(readSequence, recognizer) {
    const start = this.tokenStart;
    let children = null;

    this.eat(types.LeftSquareBracket);

    children = readSequence.call(this, recognizer);

    if (!this.eof) {
        this.eat(types.RightSquareBracket);
    }

    return {
        type: 'Brackets',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.token(types.Delim, '[');
    this.children(node);
    this.token(types.Delim, ']');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 5563:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'CDC';
const structure = [];

function parse() {
    const start = this.tokenStart;

    this.eat(types.CDC); // -->

    return {
        type: 'CDC',
        loc: this.getLocation(start, this.tokenStart)
    };
}

function generate() {
    this.token(types.CDC, '-->');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 4276:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'CDO';
const structure = [];

function parse() {
    const start = this.tokenStart;

    this.eat(types.CDO); // <!--

    return {
        type: 'CDO',
        loc: this.getLocation(start, this.tokenStart)
    };
}

function generate() {
    this.token(types.CDO, '<!--');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 288:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const FULLSTOP = 0x002E; // U+002E FULL STOP (.)

// '.' ident
const name = 'ClassSelector';
const structure = {
    name: String
};

function parse() {
    this.eatDelim(FULLSTOP);

    return {
        type: 'ClassSelector',
        loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
        name: this.consume(types.Ident)
    };
}

function generate(node) {
    this.token(types.Delim, '.');
    this.token(types.Ident, node.name);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 4074:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
const SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)
const GREATERTHANSIGN = 0x003E; // U+003E GREATER-THAN SIGN (>)
const TILDE = 0x007E;           // U+007E TILDE (~)

const name = 'Combinator';
const structure = {
    name: String
};

// + | > | ~ | /deep/
function parse() {
    const start = this.tokenStart;
    let name;

    switch (this.tokenType) {
        case types.WhiteSpace:
            name = ' ';
            break;

        case types.Delim:
            switch (this.charCodeAt(this.tokenStart)) {
                case GREATERTHANSIGN:
                case PLUSSIGN:
                case TILDE:
                    this.next();
                    break;

                case SOLIDUS:
                    this.next();
                    this.eatIdent('deep');
                    this.eatDelim(SOLIDUS);
                    break;

                default:
                    this.error('Combinator is expected');
            }

            name = this.substrToCursor(start);
            break;
    }

    return {
        type: 'Combinator',
        loc: this.getLocation(start, this.tokenStart),
        name
    };
}

function generate(node) {
    this.tokenize(node.name);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 5520:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const ASTERISK = 0x002A;        // U+002A ASTERISK (*)
const SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)


const name = 'Comment';
const structure = {
    value: String
};

function parse() {
    const start = this.tokenStart;
    let end = this.tokenEnd;

    this.eat(types.Comment);

    if ((end - start + 2) >= 2 &&
        this.charCodeAt(end - 2) === ASTERISK &&
        this.charCodeAt(end - 1) === SOLIDUS) {
        end -= 2;
    }

    return {
        type: 'Comment',
        loc: this.getLocation(start, this.tokenStart),
        value: this.substring(start + 2, end)
    };
}

function generate(node) {
    this.token(types.Comment, '/*' + node.value + '*/');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 5262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const names = __webpack_require__(2543);
const types = __webpack_require__(4764);
__webpack_require__(7154);

const EXCLAMATIONMARK = 0x0021; // U+0021 EXCLAMATION MARK (!)
const NUMBERSIGN = 0x0023;      // U+0023 NUMBER SIGN (#)
const DOLLARSIGN = 0x0024;      // U+0024 DOLLAR SIGN ($)
const AMPERSAND = 0x0026;       // U+0026 AMPERSAND (&)
const ASTERISK = 0x002A;        // U+002A ASTERISK (*)
const PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
const SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)

function consumeValueRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilExclamationMarkOrSemicolon, true);
}

function consumeCustomPropertyRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilExclamationMarkOrSemicolon, false);
}

function consumeValue() {
    const startValueToken = this.tokenIndex;
    const value = this.Value();

    if (value.type !== 'Raw' &&
        this.eof === false &&
        this.tokenType !== types.Semicolon &&
        this.isDelim(EXCLAMATIONMARK) === false &&
        this.isBalanceEdge(startValueToken) === false) {
        this.error();
    }

    return value;
}

const name = 'Declaration';
const walkContext = 'declaration';
const structure = {
    important: [Boolean, String],
    property: String,
    value: ['Value', 'Raw']
};

function parse() {
    const start = this.tokenStart;
    const startToken = this.tokenIndex;
    const property = readProperty.call(this);
    const customProperty = names.isCustomProperty(property);
    const parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
    const consumeRaw = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
    let important = false;
    let value;

    this.skipSC();
    this.eat(types.Colon);

    const valueStart = this.tokenIndex;

    if (!customProperty) {
        this.skipSC();
    }

    if (parseValue) {
        value = this.parseWithFallback(consumeValue, consumeRaw);
    } else {
        value = consumeRaw.call(this, this.tokenIndex);
    }

    if (customProperty && value.type === 'Value' && value.children.isEmpty) {
        for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) {
            if (this.lookupType(offset) === types.WhiteSpace) {
                value.children.appendData({
                    type: 'WhiteSpace',
                    loc: null,
                    value: ' '
                });
                break;
            }
        }
    }

    if (this.isDelim(EXCLAMATIONMARK)) {
        important = getImportant.call(this);
        this.skipSC();
    }

    // Do not include semicolon to range per spec
    // https://drafts.csswg.org/css-syntax/#declaration-diagram

    if (this.eof === false &&
        this.tokenType !== types.Semicolon &&
        this.isBalanceEdge(startToken) === false) {
        this.error();
    }

    return {
        type: 'Declaration',
        loc: this.getLocation(start, this.tokenStart),
        important,
        property,
        value
    };
}

function generate(node) {
    this.token(types.Ident, node.property);
    this.token(types.Colon, ':');
    this.node(node.value);

    if (node.important) {
        this.token(types.Delim, '!');
        this.token(types.Ident, node.important === true ? 'important' : node.important);
    }
}

function readProperty() {
    const start = this.tokenStart;

    // hacks
    if (this.tokenType === types.Delim) {
        switch (this.charCodeAt(this.tokenStart)) {
            case ASTERISK:
            case DOLLARSIGN:
            case PLUSSIGN:
            case NUMBERSIGN:
            case AMPERSAND:
                this.next();
                break;

            // TODO: not sure we should support this hack
            case SOLIDUS:
                this.next();
                if (this.isDelim(SOLIDUS)) {
                    this.next();
                }
                break;
        }
    }

    if (this.tokenType === types.Hash) {
        this.eat(types.Hash);
    } else {
        this.eat(types.Ident);
    }

    return this.substrToCursor(start);
}

// ! ws* important
function getImportant() {
    this.eat(types.Delim);
    this.skipSC();

    const important = this.consume(types.Ident);

    // store original value in case it differ from `important`
    // for better original source restoring and hacks like `!ie` support
    return important === 'important' ? true : important;
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 1786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

function consumeRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true);
}

const name = 'DeclarationList';
const structure = {
    children: [[
        'Declaration'
    ]]
};

function parse() {
    const children = this.createList();

    while (!this.eof) {
        switch (this.tokenType) {
            case types.WhiteSpace:
            case types.Comment:
            case types.Semicolon:
                this.next();
                break;

            default:
                children.push(this.parseWithFallback(this.Declaration, consumeRaw));
        }
    }

    return {
        type: 'DeclarationList',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node, prev => {
        if (prev.type === 'Declaration') {
            this.token(types.Semicolon, ';');
        }
    });
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 8121:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Dimension';
const structure = {
    value: String,
    unit: String
};

function parse() {
    const start = this.tokenStart;
    const value = this.consumeNumber(types.Dimension);

    return {
        type: 'Dimension',
        loc: this.getLocation(start, this.tokenStart),
        value,
        unit: this.substring(start + value.length, this.tokenStart)
    };
}

function generate(node) {
    this.token(types.Dimension, node.value + node.unit);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 4949:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Function';
const walkContext = 'function';
const structure = {
    name: String,
    children: [[]]
};

// <function-token> <sequence> )
function parse(readSequence, recognizer) {
    const start = this.tokenStart;
    const name = this.consumeFunctionName();
    const nameLowerCase = name.toLowerCase();
    let children;

    children = recognizer.hasOwnProperty(nameLowerCase)
        ? recognizer[nameLowerCase].call(this, recognizer)
        : readSequence.call(this, recognizer);

    if (!this.eof) {
        this.eat(types.RightParenthesis);
    }

    return {
        type: 'Function',
        loc: this.getLocation(start, this.tokenStart),
        name,
        children
    };
}

function generate(node) {
    this.token(types.Function, node.name + '(');
    this.children(node);
    this.token(types.RightParenthesis, ')');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 3501:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

// '#' ident
const xxx = 'XXX';
const name = 'Hash';
const structure = {
    value: String
};
function parse() {
    const start = this.tokenStart;

    this.eat(types.Hash);

    return {
        type: 'Hash',
        loc: this.getLocation(start, this.tokenStart),
        value: this.substrToCursor(start + 1)
    };
}
function generate(node) {
    this.token(types.Hash, '#' + node.value);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.xxx = xxx;


/***/ }),

/***/ 7461:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'IdSelector';
const structure = {
    name: String
};

function parse() {
    const start = this.tokenStart;

    // TODO: check value is an ident
    this.eat(types.Hash);

    return {
        type: 'IdSelector',
        loc: this.getLocation(start, this.tokenStart),
        name: this.substrToCursor(start + 1)
    };
}

function generate(node) {
    // Using Delim instead of Hash is a hack to avoid for a whitespace between ident and id-selector
    // in safe mode (e.g. "a#id"), because IE11 doesn't allow a sequence <ident-token> <hash-token>
    // without a whitespace in values (e.g. "1px solid#000")
    this.token(types.Delim, '#' + node.name);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 1897:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Identifier';
const structure = {
    name: String
};

function parse() {
    return {
        type: 'Identifier',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        name: this.consume(types.Ident)
    };
}

function generate(node) {
    this.token(types.Ident, node.name);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 4734:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'MediaFeature';
const structure = {
    name: String,
    value: ['Identifier', 'Number', 'Dimension', 'Ratio', null]
};

function parse() {
    const start = this.tokenStart;
    let name;
    let value = null;

    this.eat(types.LeftParenthesis);
    this.skipSC();

    name = this.consume(types.Ident);
    this.skipSC();

    if (this.tokenType !== types.RightParenthesis) {
        this.eat(types.Colon);
        this.skipSC();

        switch (this.tokenType) {
            case types.Number:
                if (this.lookupNonWSType(1) === types.Delim) {
                    value = this.Ratio();
                } else {
                    value = this.Number();
                }

                break;

            case types.Dimension:
                value = this.Dimension();
                break;

            case types.Ident:
                value = this.Identifier();
                break;

            default:
                this.error('Number, dimension, ratio or identifier is expected');
        }

        this.skipSC();
    }

    this.eat(types.RightParenthesis);

    return {
        type: 'MediaFeature',
        loc: this.getLocation(start, this.tokenStart),
        name,
        value
    };
}

function generate(node) {
    this.token(types.LeftParenthesis, '(');
    this.token(types.Ident, node.name);

    if (node.value !== null) {
        this.token(types.Colon, ':');
        this.node(node.value);
    }

    this.token(types.RightParenthesis, ')');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 2171:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'MediaQuery';
const structure = {
    children: [[
        'Identifier',
        'MediaFeature',
        'WhiteSpace'
    ]]
};

function parse() {
    const children = this.createList();
    let child = null;

    this.skipSC();

    scan:
    while (!this.eof) {
        switch (this.tokenType) {
            case types.Comment:
            case types.WhiteSpace:
                this.next();
                continue;

            case types.Ident:
                child = this.Identifier();
                break;

            case types.LeftParenthesis:
                child = this.MediaFeature();
                break;

            default:
                break scan;
        }

        children.push(child);
    }

    if (child === null) {
        this.error('Identifier or parenthesis is expected');
    }

    return {
        type: 'MediaQuery',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 6350:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'MediaQueryList';
const structure = {
    children: [[
        'MediaQuery'
    ]]
};

function parse() {
    const children = this.createList();

    this.skipSC();

    while (!this.eof) {
        children.push(this.MediaQuery());

        if (this.tokenType !== types.Comma) {
            break;
        }

        this.next();
    }

    return {
        type: 'MediaQueryList',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node, () => this.token(types.Comma, ','));
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 921:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Nth';
const structure = {
    nth: ['AnPlusB', 'Identifier'],
    selector: ['SelectorList', null]
};

function parse() {
    this.skipSC();

    const start = this.tokenStart;
    let end = start;
    let selector = null;
    let nth;

    if (this.lookupValue(0, 'odd') || this.lookupValue(0, 'even')) {
        nth = this.Identifier();
    } else {
        nth = this.AnPlusB();
    }

    end = this.tokenStart;
    this.skipSC();

    if (this.lookupValue(0, 'of')) {
        this.next();

        selector = this.SelectorList();
        end = this.tokenStart;
    }

    return {
        type: 'Nth',
        loc: this.getLocation(start, end),
        nth,
        selector
    };
}

function generate(node) {
    this.node(node.nth);
    if (node.selector !== null) {
        this.token(types.Ident, 'of');
        this.node(node.selector);
    }
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 6408:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Number';
const structure = {
    value: String
};

function parse() {
    return {
        type: 'Number',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        value: this.consume(types.Number)
    };
}

function generate(node) {
    this.token(types.Number, node.value);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 3029:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


// '/' | '*' | ',' | ':' | '+' | '-'
const name = 'Operator';
const structure = {
    value: String
};

function parse() {
    const start = this.tokenStart;

    this.next();

    return {
        type: 'Operator',
        loc: this.getLocation(start, this.tokenStart),
        value: this.substrToCursor(start)
    };
}

function generate(node) {
    this.tokenize(node.value);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 8439:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Parentheses';
const structure = {
    children: [[]]
};

function parse(readSequence, recognizer) {
    const start = this.tokenStart;
    let children = null;

    this.eat(types.LeftParenthesis);

    children = readSequence.call(this, recognizer);

    if (!this.eof) {
        this.eat(types.RightParenthesis);
    }

    return {
        type: 'Parentheses',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.token(types.LeftParenthesis, '(');
    this.children(node);
    this.token(types.RightParenthesis, ')');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 1442:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Percentage';
const structure = {
    value: String
};

function parse() {
    return {
        type: 'Percentage',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        value: this.consumeNumber(types.Percentage)
    };
}

function generate(node) {
    this.token(types.Percentage, node.value + '%');
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 5636:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'PseudoClassSelector';
const walkContext = 'function';
const structure = {
    name: String,
    children: [['Raw'], null]
};

// : [ <ident> | <function-token> <any-value>? ) ]
function parse() {
    const start = this.tokenStart;
    let children = null;
    let name;
    let nameLowerCase;

    this.eat(types.Colon);

    if (this.tokenType === types.Function) {
        name = this.consumeFunctionName();
        nameLowerCase = name.toLowerCase();

        if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
            this.skipSC();
            children = this.pseudo[nameLowerCase].call(this);
            this.skipSC();
        } else {
            children = this.createList();
            children.push(
                this.Raw(this.tokenIndex, null, false)
            );
        }

        this.eat(types.RightParenthesis);
    } else {
        name = this.consume(types.Ident);
    }

    return {
        type: 'PseudoClassSelector',
        loc: this.getLocation(start, this.tokenStart),
        name,
        children
    };
}

function generate(node) {
    this.token(types.Colon, ':');

    if (node.children === null) {
        this.token(types.Ident, node.name);
    } else {
        this.token(types.Function, node.name + '(');
        this.children(node);
        this.token(types.RightParenthesis, ')');
    }
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 3008:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'PseudoElementSelector';
const walkContext = 'function';
const structure = {
    name: String,
    children: [['Raw'], null]
};

// :: [ <ident> | <function-token> <any-value>? ) ]
function parse() {
    const start = this.tokenStart;
    let children = null;
    let name;
    let nameLowerCase;

    this.eat(types.Colon);
    this.eat(types.Colon);

    if (this.tokenType === types.Function) {
        name = this.consumeFunctionName();
        nameLowerCase = name.toLowerCase();

        if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
            this.skipSC();
            children = this.pseudo[nameLowerCase].call(this);
            this.skipSC();
        } else {
            children = this.createList();
            children.push(
                this.Raw(this.tokenIndex, null, false)
            );
        }

        this.eat(types.RightParenthesis);
    } else {
        name = this.consume(types.Ident);
    }

    return {
        type: 'PseudoElementSelector',
        loc: this.getLocation(start, this.tokenStart),
        name,
        children
    };
}

function generate(node) {
    this.token(types.Colon, ':');
    this.token(types.Colon, ':');

    if (node.children === null) {
        this.token(types.Ident, node.name);
    } else {
        this.token(types.Function, node.name + '(');
        this.children(node);
        this.token(types.RightParenthesis, ')');
    }
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 5264:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
const charCodeDefinitions = __webpack_require__(7154);

const SOLIDUS = 0x002F;  // U+002F SOLIDUS (/)
const FULLSTOP = 0x002E; // U+002E FULL STOP (.)

// Terms of <ratio> should be a positive numbers (not zero or negative)
// (see https://drafts.csswg.org/mediaqueries-3/#values)
// However, -o-min-device-pixel-ratio takes fractional values as a ratio's term
// and this is using by various sites. Therefore we relax checking on parse
// to test a term is unsigned number without an exponent part.
// Additional checking may be applied on lexer validation.
function consumeNumber() {
    this.skipSC();

    const value = this.consume(types.Number);

    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);
        if (!charCodeDefinitions.isDigit(code) && code !== FULLSTOP) {
            this.error('Unsigned number is expected', this.tokenStart - value.length + i);
        }
    }

    if (Number(value) === 0) {
        this.error('Zero number is not allowed', this.tokenStart - value.length);
    }

    return value;
}

const name = 'Ratio';
const structure = {
    left: String,
    right: String
};

// <positive-integer> S* '/' S* <positive-integer>
function parse() {
    const start = this.tokenStart;
    const left = consumeNumber.call(this);
    let right;

    this.skipSC();
    this.eatDelim(SOLIDUS);
    right = consumeNumber.call(this);

    return {
        type: 'Ratio',
        loc: this.getLocation(start, this.tokenStart),
        left,
        right
    };
}

function generate(node) {
    this.token(types.Number, node.left);
    this.token(types.Delim, '/');
    this.token(types.Number, node.right);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 8433:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

function getOffsetExcludeWS() {
    if (this.tokenIndex > 0) {
        if (this.lookupType(-1) === types.WhiteSpace) {
            return this.tokenIndex > 1
                ? this.getTokenStart(this.tokenIndex - 1)
                : this.firstCharOffset;
        }
    }

    return this.tokenStart;
}

const name = 'Raw';
const structure = {
    value: String
};

function parse(startToken, consumeUntil, excludeWhiteSpace) {
    const startOffset = this.getTokenStart(startToken);
    let endOffset;

    this.skipUntilBalanced(startToken, consumeUntil || this.consumeUntilBalanceEnd);

    if (excludeWhiteSpace && this.tokenStart > startOffset) {
        endOffset = getOffsetExcludeWS.call(this);
    } else {
        endOffset = this.tokenStart;
    }

    return {
        type: 'Raw',
        loc: this.getLocation(startOffset, endOffset),
        value: this.substring(startOffset, endOffset)
    };
}

function generate(node) {
    this.tokenize(node.value);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 2931:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

function consumeRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilLeftCurlyBracket, true);
}

function consumePrelude() {
    const prelude = this.SelectorList();

    if (prelude.type !== 'Raw' &&
        this.eof === false &&
        this.tokenType !== types.LeftCurlyBracket) {
        this.error();
    }

    return prelude;
}

const name = 'Rule';
const walkContext = 'rule';
const structure = {
    prelude: ['SelectorList', 'Raw'],
    block: ['Block']
};

function parse() {
    const startToken = this.tokenIndex;
    const startOffset = this.tokenStart;
    let prelude;
    let block;

    if (this.parseRulePrelude) {
        prelude = this.parseWithFallback(consumePrelude, consumeRaw);
    } else {
        prelude = consumeRaw.call(this, startToken);
    }

    block = this.Block(true);

    return {
        type: 'Rule',
        loc: this.getLocation(startOffset, this.tokenStart),
        prelude,
        block
    };
}
function generate(node) {
    this.node(node.prelude);
    this.node(node.block);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 7378:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const name = 'Selector';
const structure = {
    children: [[
        'TypeSelector',
        'IdSelector',
        'ClassSelector',
        'AttributeSelector',
        'PseudoClassSelector',
        'PseudoElementSelector',
        'Combinator',
        'WhiteSpace'
    ]]
};

function parse() {
    const children = this.readSequence(this.scope.Selector);

    // nothing were consumed
    if (this.getFirstListNode(children) === null) {
        this.error('Selector is expected');
    }

    return {
        type: 'Selector',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 9529:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'SelectorList';
const walkContext = 'selector';
const structure = {
    children: [[
        'Selector',
        'Raw'
    ]]
};

function parse() {
    const children = this.createList();

    while (!this.eof) {
        children.push(this.Selector());

        if (this.tokenType === types.Comma) {
            this.next();
            continue;
        }

        break;
    }

    return {
        type: 'SelectorList',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node, () => this.token(types.Comma, ','));
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 3856:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);
const string = __webpack_require__(1705);

const name = 'String';
const structure = {
    value: String
};

function parse() {
    return {
        type: 'String',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        value: string.decode(this.consume(types.String))
    };
}

function generate(node) {
    this.token(types.String, string.encode(node.value));
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 2114:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const EXCLAMATIONMARK = 0x0021; // U+0021 EXCLAMATION MARK (!)

function consumeRaw(startToken) {
    return this.Raw(startToken, null, false);
}

const name = 'StyleSheet';
const walkContext = 'stylesheet';
const structure = {
    children: [[
        'Comment',
        'CDO',
        'CDC',
        'Atrule',
        'Rule',
        'Raw'
    ]]
};

function parse() {
    const start = this.tokenStart;
    const children = this.createList();
    let child;

    while (!this.eof) {
        switch (this.tokenType) {
            case types.WhiteSpace:
                this.next();
                continue;

            case types.Comment:
                // ignore comments except exclamation comments (i.e. /*! .. */) on top level
                if (this.charCodeAt(this.tokenStart + 2) !== EXCLAMATIONMARK) {
                    this.next();
                    continue;
                }

                child = this.Comment();
                break;

            case types.CDO: // <!--
                child = this.CDO();
                break;

            case types.CDC: // -->
                child = this.CDC();
                break;

            // CSS Syntax Module Level 3
            // §2.2 Error handling
            // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
            case types.AtKeyword:
                child = this.parseWithFallback(this.Atrule, consumeRaw);
                break;

            // Anything else starts a qualified rule ...
            default:
                child = this.parseWithFallback(this.Rule, consumeRaw);
        }

        children.push(child);
    }

    return {
        type: 'StyleSheet',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.children(node);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;
exports.walkContext = walkContext;


/***/ }),

/***/ 1566:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const ASTERISK = 0x002A;     // U+002A ASTERISK (*)
const VERTICALLINE = 0x007C; // U+007C VERTICAL LINE (|)

function eatIdentifierOrAsterisk() {
    if (this.tokenType !== types.Ident &&
        this.isDelim(ASTERISK) === false) {
        this.error('Identifier or asterisk is expected');
    }

    this.next();
}

const name = 'TypeSelector';
const structure = {
    name: String
};

// ident
// ident|ident
// ident|*
// *
// *|ident
// *|*
// |ident
// |*
function parse() {
    const start = this.tokenStart;

    if (this.isDelim(VERTICALLINE)) {
        this.next();
        eatIdentifierOrAsterisk.call(this);
    } else {
        eatIdentifierOrAsterisk.call(this);

        if (this.isDelim(VERTICALLINE)) {
            this.next();
            eatIdentifierOrAsterisk.call(this);
        }
    }

    return {
        type: 'TypeSelector',
        loc: this.getLocation(start, this.tokenStart),
        name: this.substrToCursor(start)
    };
}

function generate(node) {
    this.tokenize(node.name);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 2598:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
const charCodeDefinitions = __webpack_require__(7154);

const PLUSSIGN = 0x002B;     // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D;  // U+002D HYPHEN-MINUS (-)
const QUESTIONMARK = 0x003F; // U+003F QUESTION MARK (?)

function eatHexSequence(offset, allowDash) {
    let len = 0;

    for (let pos = this.tokenStart + offset; pos < this.tokenEnd; pos++) {
        const code = this.charCodeAt(pos);

        if (code === HYPHENMINUS && allowDash && len !== 0) {
            eatHexSequence.call(this, offset + len + 1, false);
            return -1;
        }

        if (!charCodeDefinitions.isHexDigit(code)) {
            this.error(
                allowDash && len !== 0
                    ? 'Hyphen minus' + (len < 6 ? ' or hex digit' : '') + ' is expected'
                    : (len < 6 ? 'Hex digit is expected' : 'Unexpected input'),
                pos
            );
        }

        if (++len > 6) {
            this.error('Too many hex digits', pos);
        }    }

    this.next();
    return len;
}

function eatQuestionMarkSequence(max) {
    let count = 0;

    while (this.isDelim(QUESTIONMARK)) {
        if (++count > max) {
            this.error('Too many question marks');
        }

        this.next();
    }
}

function startsWith(code) {
    if (this.charCodeAt(this.tokenStart) !== code) {
        this.error((code === PLUSSIGN ? 'Plus sign' : 'Hyphen minus') + ' is expected');
    }
}

// https://drafts.csswg.org/css-syntax/#urange
// Informally, the <urange> production has three forms:
// U+0001
//      Defines a range consisting of a single code point, in this case the code point "1".
// U+0001-00ff
//      Defines a range of codepoints between the first and the second value, in this case
//      the range between "1" and "ff" (255 in decimal) inclusive.
// U+00??
//      Defines a range of codepoints where the "?" characters range over all hex digits,
//      in this case defining the same as the value U+0000-00ff.
// In each form, a maximum of 6 digits is allowed for each hexadecimal number (if you treat "?" as a hexadecimal digit).
//
// <urange> =
//   u '+' <ident-token> '?'* |
//   u <dimension-token> '?'* |
//   u <number-token> '?'* |
//   u <number-token> <dimension-token> |
//   u <number-token> <number-token> |
//   u '+' '?'+
function scanUnicodeRange() {
    let hexLength = 0;

    switch (this.tokenType) {
        case types.Number:
            // u <number-token> '?'*
            // u <number-token> <dimension-token>
            // u <number-token> <number-token>
            hexLength = eatHexSequence.call(this, 1, true);

            if (this.isDelim(QUESTIONMARK)) {
                eatQuestionMarkSequence.call(this, 6 - hexLength);
                break;
            }

            if (this.tokenType === types.Dimension ||
                this.tokenType === types.Number) {
                startsWith.call(this, HYPHENMINUS);
                eatHexSequence.call(this, 1, false);
                break;
            }

            break;

        case types.Dimension:
            // u <dimension-token> '?'*
            hexLength = eatHexSequence.call(this, 1, true);

            if (hexLength > 0) {
                eatQuestionMarkSequence.call(this, 6 - hexLength);
            }

            break;

        default:
            // u '+' <ident-token> '?'*
            // u '+' '?'+
            this.eatDelim(PLUSSIGN);

            if (this.tokenType === types.Ident) {
                hexLength = eatHexSequence.call(this, 0, true);
                if (hexLength > 0) {
                    eatQuestionMarkSequence.call(this, 6 - hexLength);
                }
                break;
            }

            if (this.isDelim(QUESTIONMARK)) {
                this.next();
                eatQuestionMarkSequence.call(this, 5);
                break;
            }

            this.error('Hex digit or question mark is expected');
    }
}

const name = 'UnicodeRange';
const structure = {
    value: String
};

function parse() {
    const start = this.tokenStart;

    // U or u
    this.eatIdent('u');
    scanUnicodeRange.call(this);

    return {
        type: 'UnicodeRange',
        loc: this.getLocation(start, this.tokenStart),
        value: this.substrToCursor(start)
    };
}

function generate(node) {
    this.tokenize(node.value);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 3192:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const url = __webpack_require__(213);
const string = __webpack_require__(1705);
const types = __webpack_require__(4764);
__webpack_require__(7154);

const name = 'Url';
const structure = {
    value: String
};

// <url-token> | <function-token> <string> )
function parse() {
    const start = this.tokenStart;
    let value;

    switch (this.tokenType) {
        case types.Url:
            value = url.decode(this.consume(types.Url));
            break;

        case types.Function:
            if (!this.cmpStr(this.tokenStart, this.tokenEnd, 'url(')) {
                this.error('Function name must be `url`');
            }

            this.eat(types.Function);
            this.skipSC();
            value = string.decode(this.consume(types.String));
            this.skipSC();
            if (!this.eof) {
                this.eat(types.RightParenthesis);
            }
            break;

        default:
            this.error('Url or Function is expected');
    }

    return {
        type: 'Url',
        loc: this.getLocation(start, this.tokenStart),
        value
    };
}

function generate(node) {
    this.token(types.Url, url.encode(node.value));
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 315:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const name = 'Value';
const structure = {
    children: [[]]
};

function parse() {
    const start = this.tokenStart;
    const children = this.readSequence(this.scope.Value);

    return {
        type: 'Value',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.children(node);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 2495:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const SPACE = Object.freeze({
    type: 'WhiteSpace',
    loc: null,
    value: ' '
});

const name = 'WhiteSpace';
const structure = {
    value: String
};

function parse() {
    this.eat(types.WhiteSpace);
    return SPACE;

    // return {
    //     type: 'WhiteSpace',
    //     loc: this.getLocation(this.tokenStart, this.tokenEnd),
    //     value: this.consume(WHITESPACE)
    // };
}

function generate(node) {
    this.token(types.WhiteSpace, node.value);
}

exports.generate = generate;
exports.name = name;
exports.parse = parse;
exports.structure = structure;


/***/ }),

/***/ 9162:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const AnPlusB = __webpack_require__(8443);
const Atrule = __webpack_require__(6071);
const AtrulePrelude = __webpack_require__(5275);
const AttributeSelector = __webpack_require__(6458);
const Block = __webpack_require__(7434);
const Brackets = __webpack_require__(4192);
const CDC = __webpack_require__(5563);
const CDO = __webpack_require__(4276);
const ClassSelector = __webpack_require__(288);
const Combinator = __webpack_require__(4074);
const Comment = __webpack_require__(5520);
const Declaration = __webpack_require__(5262);
const DeclarationList = __webpack_require__(1786);
const Dimension = __webpack_require__(8121);
const _Function = __webpack_require__(4949);
const Hash = __webpack_require__(3501);
const Identifier = __webpack_require__(1897);
const IdSelector = __webpack_require__(7461);
const MediaFeature = __webpack_require__(4734);
const MediaQuery = __webpack_require__(2171);
const MediaQueryList = __webpack_require__(6350);
const Nth = __webpack_require__(921);
const _Number = __webpack_require__(6408);
const Operator = __webpack_require__(3029);
const Parentheses = __webpack_require__(8439);
const Percentage = __webpack_require__(1442);
const PseudoClassSelector = __webpack_require__(5636);
const PseudoElementSelector = __webpack_require__(3008);
const Ratio = __webpack_require__(5264);
const Raw = __webpack_require__(8433);
const Rule = __webpack_require__(2931);
const Selector = __webpack_require__(7378);
const SelectorList = __webpack_require__(9529);
const _String = __webpack_require__(3856);
const StyleSheet = __webpack_require__(2114);
const TypeSelector = __webpack_require__(1566);
const UnicodeRange = __webpack_require__(2598);
const Url = __webpack_require__(3192);
const Value = __webpack_require__(315);
const WhiteSpace = __webpack_require__(2495);



exports.AnPlusB = AnPlusB;
exports.Atrule = Atrule;
exports.AtrulePrelude = AtrulePrelude;
exports.AttributeSelector = AttributeSelector;
exports.Block = Block;
exports.Brackets = Brackets;
exports.CDC = CDC;
exports.CDO = CDO;
exports.ClassSelector = ClassSelector;
exports.Combinator = Combinator;
exports.Comment = Comment;
exports.Declaration = Declaration;
exports.DeclarationList = DeclarationList;
exports.Dimension = Dimension;
exports.Function = _Function;
exports.Hash = Hash;
exports.Identifier = Identifier;
exports.IdSelector = IdSelector;
exports.MediaFeature = MediaFeature;
exports.MediaQuery = MediaQuery;
exports.MediaQueryList = MediaQueryList;
exports.Nth = Nth;
exports.Number = _Number;
exports.Operator = Operator;
exports.Parentheses = Parentheses;
exports.Percentage = Percentage;
exports.PseudoClassSelector = PseudoClassSelector;
exports.PseudoElementSelector = PseudoElementSelector;
exports.Ratio = Ratio;
exports.Raw = Raw;
exports.Rule = Rule;
exports.Selector = Selector;
exports.SelectorList = SelectorList;
exports.String = _String;
exports.StyleSheet = StyleSheet;
exports.TypeSelector = TypeSelector;
exports.UnicodeRange = UnicodeRange;
exports.Url = Url;
exports.Value = Value;
exports.WhiteSpace = WhiteSpace;


/***/ }),

/***/ 9585:
/***/ ((module) => {

"use strict";


const selectorList = {
    parse() {
        return this.createSingleNodeList(
            this.SelectorList()
        );
    }
};

const selector = {
    parse() {
        return this.createSingleNodeList(
            this.Selector()
        );
    }
};

const identList = {
    parse() {
        return this.createSingleNodeList(
            this.Identifier()
        );
    }
};

const nth = {
    parse() {
        return this.createSingleNodeList(
            this.Nth()
        );
    }
};

const pseudo = {
    'dir': identList,
    'has': selectorList,
    'lang': identList,
    'matches': selectorList,
    'not': selectorList,
    'nth-child': nth,
    'nth-last-child': nth,
    'nth-last-of-type': nth,
    'nth-of-type': nth,
    'slotted': selector
};

module.exports = pseudo;


/***/ }),

/***/ 3303:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const _default = __webpack_require__(321);

const atrulePrelude = {
    getNode: _default
};

module.exports = atrulePrelude;


/***/ }),

/***/ 321:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const NUMBERSIGN = 0x0023;  // U+0023 NUMBER SIGN (#)
const ASTERISK = 0x002A;    // U+002A ASTERISK (*)
const PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
const SOLIDUS = 0x002F;     // U+002F SOLIDUS (/)
const U = 0x0075;           // U+0075 LATIN SMALL LETTER U (u)

function defaultRecognizer(context) {
    switch (this.tokenType) {
        case types.Hash:
            return this.Hash();

        case types.Comma:
            return this.Operator();

        case types.LeftParenthesis:
            return this.Parentheses(this.readSequence, context.recognizer);

        case types.LeftSquareBracket:
            return this.Brackets(this.readSequence, context.recognizer);

        case types.String:
            return this.String();

        case types.Dimension:
            return this.Dimension();

        case types.Percentage:
            return this.Percentage();

        case types.Number:
            return this.Number();

        case types.Function:
            return this.cmpStr(this.tokenStart, this.tokenEnd, 'url(')
                ? this.Url()
                : this.Function(this.readSequence, context.recognizer);

        case types.Url:
            return this.Url();

        case types.Ident:
            // check for unicode range, it should start with u+ or U+
            if (this.cmpChar(this.tokenStart, U) &&
                this.cmpChar(this.tokenStart + 1, PLUSSIGN)) {
                return this.UnicodeRange();
            } else {
                return this.Identifier();
            }

        case types.Delim: {
            const code = this.charCodeAt(this.tokenStart);

            if (code === SOLIDUS ||
                code === ASTERISK ||
                code === PLUSSIGN ||
                code === HYPHENMINUS) {
                return this.Operator(); // TODO: replace with Delim
            }

            // TODO: produce a node with Delim node type

            if (code === NUMBERSIGN) {
                this.error('Hex or identifier is expected', this.tokenStart + 1);
            }

            break;
        }
    }
}

module.exports = defaultRecognizer;


/***/ }),

/***/ 25:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const atrulePrelude = __webpack_require__(3303);
const selector = __webpack_require__(9075);
const value = __webpack_require__(2240);



exports.AtrulePrelude = atrulePrelude;
exports.Selector = selector;
exports.Value = value;


/***/ }),

/***/ 9075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
__webpack_require__(7154);

const NUMBERSIGN = 0x0023;      // U+0023 NUMBER SIGN (#)
const ASTERISK = 0x002A;        // U+002A ASTERISK (*)
const PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
const SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)
const FULLSTOP = 0x002E;        // U+002E FULL STOP (.)
const GREATERTHANSIGN = 0x003E; // U+003E GREATER-THAN SIGN (>)
const VERTICALLINE = 0x007C;    // U+007C VERTICAL LINE (|)
const TILDE = 0x007E;           // U+007E TILDE (~)

function onWhiteSpace(next, children) {
    if (children.last !== null && children.last.type !== 'Combinator' &&
        next !== null && next.type !== 'Combinator') {
        children.push({  // FIXME: this.Combinator() should be used instead
            type: 'Combinator',
            loc: null,
            name: ' '
        });
    }
}

function getNode() {
    switch (this.tokenType) {
        case types.LeftSquareBracket:
            return this.AttributeSelector();

        case types.Hash:
            return this.IdSelector();

        case types.Colon:
            if (this.lookupType(1) === types.Colon) {
                return this.PseudoElementSelector();
            } else {
                return this.PseudoClassSelector();
            }

        case types.Ident:
            return this.TypeSelector();

        case types.Number:
        case types.Percentage:
            return this.Percentage();

        case types.Dimension:
            // throws when .123ident
            if (this.charCodeAt(this.tokenStart) === FULLSTOP) {
                this.error('Identifier is expected', this.tokenStart + 1);
            }
            break;

        case types.Delim: {
            const code = this.charCodeAt(this.tokenStart);

            switch (code) {
                case PLUSSIGN:
                case GREATERTHANSIGN:
                case TILDE:
                case SOLIDUS:  // /deep/
                    return this.Combinator();

                case FULLSTOP:
                    return this.ClassSelector();

                case ASTERISK:
                case VERTICALLINE:
                    return this.TypeSelector();

                case NUMBERSIGN:
                    return this.IdSelector();
            }

            break;
        }
    }
}
const selector = {
    onWhiteSpace,
    getNode
};

module.exports = selector;


/***/ }),

/***/ 2240:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const _default = __webpack_require__(321);
const expression = __webpack_require__(9470);
const _var = __webpack_require__(5139);

function isPlusMinusOperator(node) {
    return (
        node !== null &&
        node.type === 'Operator' &&
        (node.value[node.value.length - 1] === '-' || node.value[node.value.length - 1] === '+')
    );
}

const value = {
    getNode: _default,
    onWhiteSpace: function(next, children) {
        if (isPlusMinusOperator(next)) {
            next.value = ' ' + next.value;
        }
        if (isPlusMinusOperator(children.last)) {
            children.last.value += ' ';
        }
    },
    'expression': expression,
    'var': _var
};

module.exports = value;


/***/ }),

/***/ 3591:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const adoptBuffer = __webpack_require__(5137);
const charCodeDefinitions = __webpack_require__(7154);

const N = 10;
const F = 12;
const R = 13;

function computeLinesAndColumns(host) {
    const source = host.source;
    const sourceLength = source.length;
    const startOffset = source.length > 0 ? charCodeDefinitions.isBOM(source.charCodeAt(0)) : 0;
    const lines = adoptBuffer.adoptBuffer(host.lines, sourceLength);
    const columns = adoptBuffer.adoptBuffer(host.columns, sourceLength);
    let line = host.startLine;
    let column = host.startColumn;

    for (let i = startOffset; i < sourceLength; i++) {
        const code = source.charCodeAt(i);

        lines[i] = line;
        columns[i] = column++;

        if (code === N || code === R || code === F) {
            if (code === R && i + 1 < sourceLength && source.charCodeAt(i + 1) === N) {
                i++;
                lines[i] = line;
                columns[i] = column;
            }

            line++;
            column = 1;
        }
    }

    lines[sourceLength] = line;
    columns[sourceLength] = column;

    host.lines = lines;
    host.columns = columns;
    host.computed = true;
}

class OffsetToLocation {
    constructor() {
        this.lines = null;
        this.columns = null;
        this.computed = false;
    }
    setSource(source, startOffset = 0, startLine = 1, startColumn = 1) {
        this.source = source;
        this.startOffset = startOffset;
        this.startLine = startLine;
        this.startColumn = startColumn;
        this.computed = false;
    }
    getLocation(offset, filename) {
        if (!this.computed) {
            computeLinesAndColumns(this);
        }

        return {
            source: filename,
            offset: this.startOffset + offset,
            line: this.lines[offset],
            column: this.columns[offset]
        };
    }
    getLocationRange(start, end, filename) {
        if (!this.computed) {
            computeLinesAndColumns(this);
        }

        return {
            source: filename,
            start: {
                offset: this.startOffset + start,
                line: this.lines[start],
                column: this.columns[start]
            },
            end: {
                offset: this.startOffset + end,
                line: this.lines[end],
                column: this.columns[end]
            }
        };
    }
}

exports.OffsetToLocation = OffsetToLocation;


/***/ }),

/***/ 7989:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const adoptBuffer = __webpack_require__(5137);
const utils = __webpack_require__(9708);
const names = __webpack_require__(7169);
const types = __webpack_require__(4764);

const OFFSET_MASK = 0x00FFFFFF;
const TYPE_SHIFT = 24;
const balancePair = new Map([
    [types.Function, types.RightParenthesis],
    [types.LeftParenthesis, types.RightParenthesis],
    [types.LeftSquareBracket, types.RightSquareBracket],
    [types.LeftCurlyBracket, types.RightCurlyBracket]
]);

class TokenStream {
    constructor(source, tokenize) {
        this.setSource(source, tokenize);
    }
    reset() {
        this.eof = false;
        this.tokenIndex = -1;
        this.tokenType = 0;
        this.tokenStart = this.firstCharOffset;
        this.tokenEnd = this.firstCharOffset;
    }
    setSource(source = '', tokenize = () => {}) {
        source = String(source || '');

        const sourceLength = source.length;
        const offsetAndType = adoptBuffer.adoptBuffer(this.offsetAndType, source.length + 1); // +1 because of eof-token
        const balance = adoptBuffer.adoptBuffer(this.balance, source.length + 1);
        let tokenCount = 0;
        let balanceCloseType = 0;
        let balanceStart = 0;
        let firstCharOffset = -1;

        // capture buffers
        this.offsetAndType = null;
        this.balance = null;

        tokenize(source, (type, start, end) => {
            switch (type) {
                default:
                    balance[tokenCount] = sourceLength;
                    break;

                case balanceCloseType: {
                    let balancePrev = balanceStart & OFFSET_MASK;
                    balanceStart = balance[balancePrev];
                    balanceCloseType = balanceStart >> TYPE_SHIFT;
                    balance[tokenCount] = balancePrev;
                    balance[balancePrev++] = tokenCount;
                    for (; balancePrev < tokenCount; balancePrev++) {
                        if (balance[balancePrev] === sourceLength) {
                            balance[balancePrev] = tokenCount;
                        }
                    }
                    break;
                }

                case types.LeftParenthesis:
                case types.Function:
                case types.LeftSquareBracket:
                case types.LeftCurlyBracket:
                    balance[tokenCount] = balanceStart;
                    balanceCloseType = balancePair.get(type);
                    balanceStart = (balanceCloseType << TYPE_SHIFT) | tokenCount;
                    break;
            }

            offsetAndType[tokenCount++] = (type << TYPE_SHIFT) | end;
            if (firstCharOffset === -1) {
                firstCharOffset = start;
            }
        });

        // finalize buffers
        offsetAndType[tokenCount] = (types.EOF << TYPE_SHIFT) | sourceLength; // <EOF-token>
        balance[tokenCount] = sourceLength;
        balance[sourceLength] = sourceLength; // prevents false positive balance match with any token
        while (balanceStart !== 0) {
            const balancePrev = balanceStart & OFFSET_MASK;
            balanceStart = balance[balancePrev];
            balance[balancePrev] = sourceLength;
        }

        this.source = source;
        this.firstCharOffset = firstCharOffset === -1 ? 0 : firstCharOffset;
        this.tokenCount = tokenCount;
        this.offsetAndType = offsetAndType;
        this.balance = balance;

        this.reset();
        this.next();
    }

    lookupType(offset) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return this.offsetAndType[offset] >> TYPE_SHIFT;
        }

        return types.EOF;
    }
    lookupOffset(offset) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return this.offsetAndType[offset - 1] & OFFSET_MASK;
        }

        return this.source.length;
    }
    lookupValue(offset, referenceStr) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return utils.cmpStr(
                this.source,
                this.offsetAndType[offset - 1] & OFFSET_MASK,
                this.offsetAndType[offset] & OFFSET_MASK,
                referenceStr
            );
        }

        return false;
    }
    getTokenStart(tokenIndex) {
        if (tokenIndex === this.tokenIndex) {
            return this.tokenStart;
        }

        if (tokenIndex > 0) {
            return tokenIndex < this.tokenCount
                ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK
                : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
        }

        return this.firstCharOffset;
    }
    substrToCursor(start) {
        return this.source.substring(start, this.tokenStart);
    }

    isBalanceEdge(pos) {
        return this.balance[this.tokenIndex] < pos;
    }
    isDelim(code, offset) {
        if (offset) {
            return (
                this.lookupType(offset) === types.Delim &&
                this.source.charCodeAt(this.lookupOffset(offset)) === code
            );
        }

        return (
            this.tokenType === types.Delim &&
            this.source.charCodeAt(this.tokenStart) === code
        );
    }

    skip(tokenCount) {
        let next = this.tokenIndex + tokenCount;

        if (next < this.tokenCount) {
            this.tokenIndex = next;
            this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
            next = this.offsetAndType[next];
            this.tokenType = next >> TYPE_SHIFT;
            this.tokenEnd = next & OFFSET_MASK;
        } else {
            this.tokenIndex = this.tokenCount;
            this.next();
        }
    }
    next() {
        let next = this.tokenIndex + 1;

        if (next < this.tokenCount) {
            this.tokenIndex = next;
            this.tokenStart = this.tokenEnd;
            next = this.offsetAndType[next];
            this.tokenType = next >> TYPE_SHIFT;
            this.tokenEnd = next & OFFSET_MASK;
        } else {
            this.eof = true;
            this.tokenIndex = this.tokenCount;
            this.tokenType = types.EOF;
            this.tokenStart = this.tokenEnd = this.source.length;
        }
    }
    skipSC() {
        while (this.tokenType === types.WhiteSpace || this.tokenType === types.Comment) {
            this.next();
        }
    }
    skipUntilBalanced(startToken, stopConsume) {
        let cursor = startToken;
        let balanceEnd;
        let offset;

        loop:
        for (; cursor < this.tokenCount; cursor++) {
            balanceEnd = this.balance[cursor];

            // stop scanning on balance edge that points to offset before start token
            if (balanceEnd < startToken) {
                break loop;
            }

            offset = cursor > 0 ? this.offsetAndType[cursor - 1] & OFFSET_MASK : this.firstCharOffset;

            // check stop condition
            switch (stopConsume(this.source.charCodeAt(offset))) {
                case 1: // just stop
                    break loop;

                case 2: // stop & included
                    cursor++;
                    break loop;

                default:
                    // fast forward to the end of balanced block
                    if (this.balance[balanceEnd] === cursor) {
                        cursor = balanceEnd;
                    }
            }
        }

        this.skip(cursor - this.tokenIndex);
    }

    forEachToken(fn) {
        for (let i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
            const start = offset;
            const item = this.offsetAndType[i];
            const end = item & OFFSET_MASK;
            const type = item >> TYPE_SHIFT;

            offset = end;

            fn(type, start, end, i);
        }
    }
    dump() {
        const tokens = new Array(this.tokenCount);

        this.forEachToken((type, start, end, index) => {
            tokens[index] = {
                idx: index,
                type: names[type],
                chunk: this.source.substring(start, end),
                balance: this.balance[index]
            };
        });

        return tokens;
    }
}

exports.TokenStream = TokenStream;


/***/ }),

/***/ 5137:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const MIN_SIZE = 16 * 1024;

function adoptBuffer(buffer = null, size) {
    if (buffer === null || buffer.length < size) {
        return new Uint32Array(Math.max(size + 1024, MIN_SIZE));
    }

    return buffer;
}

exports.adoptBuffer = adoptBuffer;


/***/ }),

/***/ 7154:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const EOF = 0;

// https://drafts.csswg.org/css-syntax-3/
// § 4.2. Definitions

// digit
// A code point between U+0030 DIGIT ZERO (0) and U+0039 DIGIT NINE (9).
function isDigit(code) {
    return code >= 0x0030 && code <= 0x0039;
}

// hex digit
// A digit, or a code point between U+0041 LATIN CAPITAL LETTER A (A) and U+0046 LATIN CAPITAL LETTER F (F),
// or a code point between U+0061 LATIN SMALL LETTER A (a) and U+0066 LATIN SMALL LETTER F (f).
function isHexDigit(code) {
    return (
        isDigit(code) || // 0 .. 9
        (code >= 0x0041 && code <= 0x0046) || // A .. F
        (code >= 0x0061 && code <= 0x0066)    // a .. f
    );
}

// uppercase letter
// A code point between U+0041 LATIN CAPITAL LETTER A (A) and U+005A LATIN CAPITAL LETTER Z (Z).
function isUppercaseLetter(code) {
    return code >= 0x0041 && code <= 0x005A;
}

// lowercase letter
// A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z).
function isLowercaseLetter(code) {
    return code >= 0x0061 && code <= 0x007A;
}

// letter
// An uppercase letter or a lowercase letter.
function isLetter(code) {
    return isUppercaseLetter(code) || isLowercaseLetter(code);
}

// non-ASCII code point
// A code point with a value equal to or greater than U+0080 <control>.
function isNonAscii(code) {
    return code >= 0x0080;
}

// name-start code point
// A letter, a non-ASCII code point, or U+005F LOW LINE (_).
function isNameStart(code) {
    return isLetter(code) || isNonAscii(code) || code === 0x005F;
}

// name code point
// A name-start code point, a digit, or U+002D HYPHEN-MINUS (-).
function isName(code) {
    return isNameStart(code) || isDigit(code) || code === 0x002D;
}

// non-printable code point
// A code point between U+0000 NULL and U+0008 BACKSPACE, or U+000B LINE TABULATION,
// or a code point between U+000E SHIFT OUT and U+001F INFORMATION SEPARATOR ONE, or U+007F DELETE.
function isNonPrintable(code) {
    return (
        (code >= 0x0000 && code <= 0x0008) ||
        (code === 0x000B) ||
        (code >= 0x000E && code <= 0x001F) ||
        (code === 0x007F)
    );
}

// newline
// U+000A LINE FEED. Note that U+000D CARRIAGE RETURN and U+000C FORM FEED are not included in this definition,
// as they are converted to U+000A LINE FEED during preprocessing.
// TODO: we doesn't do a preprocessing, so check a code point for U+000D CARRIAGE RETURN and U+000C FORM FEED
function isNewline(code) {
    return code === 0x000A || code === 0x000D || code === 0x000C;
}

// whitespace
// A newline, U+0009 CHARACTER TABULATION, or U+0020 SPACE.
function isWhiteSpace(code) {
    return isNewline(code) || code === 0x0020 || code === 0x0009;
}

// § 4.3.8. Check if two code points are a valid escape
function isValidEscape(first, second) {
    // If the first code point is not U+005C REVERSE SOLIDUS (\), return false.
    if (first !== 0x005C) {
        return false;
    }

    // Otherwise, if the second code point is a newline or EOF, return false.
    if (isNewline(second) || second === EOF) {
        return false;
    }

    // Otherwise, return true.
    return true;
}

// § 4.3.9. Check if three code points would start an identifier
function isIdentifierStart(first, second, third) {
    // Look at the first code point:

    // U+002D HYPHEN-MINUS
    if (first === 0x002D) {
        // If the second code point is a name-start code point or a U+002D HYPHEN-MINUS,
        // or the second and third code points are a valid escape, return true. Otherwise, return false.
        return (
            isNameStart(second) ||
            second === 0x002D ||
            isValidEscape(second, third)
        );
    }

    // name-start code point
    if (isNameStart(first)) {
        // Return true.
        return true;
    }

    // U+005C REVERSE SOLIDUS (\)
    if (first === 0x005C) {
        // If the first and second code points are a valid escape, return true. Otherwise, return false.
        return isValidEscape(first, second);
    }

    // anything else
    // Return false.
    return false;
}

// § 4.3.10. Check if three code points would start a number
function isNumberStart(first, second, third) {
    // Look at the first code point:

    // U+002B PLUS SIGN (+)
    // U+002D HYPHEN-MINUS (-)
    if (first === 0x002B || first === 0x002D) {
        // If the second code point is a digit, return true.
        if (isDigit(second)) {
            return 2;
        }

        // Otherwise, if the second code point is a U+002E FULL STOP (.)
        // and the third code point is a digit, return true.
        // Otherwise, return false.
        return second === 0x002E && isDigit(third) ? 3 : 0;
    }

    // U+002E FULL STOP (.)
    if (first === 0x002E) {
        // If the second code point is a digit, return true. Otherwise, return false.
        return isDigit(second) ? 2 : 0;
    }

    // digit
    if (isDigit(first)) {
        // Return true.
        return 1;
    }

    // anything else
    // Return false.
    return 0;
}

//
// Misc
//

// detect BOM (https://en.wikipedia.org/wiki/Byte_order_mark)
function isBOM(code) {
    // UTF-16BE
    if (code === 0xFEFF) {
        return 1;
    }

    // UTF-16LE
    if (code === 0xFFFE) {
        return 1;
    }

    return 0;
}

// Fast code category
// Only ASCII code points has a special meaning, that's why we define a maps for 0..127 codes only
const CATEGORY = new Array(0x80);
const EofCategory = 0x80;
const WhiteSpaceCategory = 0x82;
const DigitCategory = 0x83;
const NameStartCategory = 0x84;
const NonPrintableCategory = 0x85;

for (let i = 0; i < CATEGORY.length; i++) {
    CATEGORY[i] =
        isWhiteSpace(i) && WhiteSpaceCategory ||
        isDigit(i) && DigitCategory ||
        isNameStart(i) && NameStartCategory ||
        isNonPrintable(i) && NonPrintableCategory ||
        i || EofCategory;
}

function charCodeCategory(code) {
    return code < 0x80 ? CATEGORY[code] : NameStartCategory;
}

exports.DigitCategory = DigitCategory;
exports.EofCategory = EofCategory;
exports.NameStartCategory = NameStartCategory;
exports.NonPrintableCategory = NonPrintableCategory;
exports.WhiteSpaceCategory = WhiteSpaceCategory;
exports.charCodeCategory = charCodeCategory;
exports.isBOM = isBOM;
exports.isDigit = isDigit;
exports.isHexDigit = isHexDigit;
exports.isIdentifierStart = isIdentifierStart;
exports.isLetter = isLetter;
exports.isLowercaseLetter = isLowercaseLetter;
exports.isName = isName;
exports.isNameStart = isNameStart;
exports.isNewline = isNewline;
exports.isNonAscii = isNonAscii;
exports.isNonPrintable = isNonPrintable;
exports.isNumberStart = isNumberStart;
exports.isUppercaseLetter = isUppercaseLetter;
exports.isValidEscape = isValidEscape;
exports.isWhiteSpace = isWhiteSpace;


/***/ }),

/***/ 338:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const types = __webpack_require__(4764);
const charCodeDefinitions = __webpack_require__(7154);
const utils = __webpack_require__(9708);

function tokenize(source, onToken) {
    function getCharCode(offset) {
        return offset < sourceLength ? source.charCodeAt(offset) : 0;
    }

    // § 4.3.3. Consume a numeric token
    function consumeNumericToken() {
        // Consume a number and let number be the result.
        offset = utils.consumeNumber(source, offset);

        // If the next 3 input code points would start an identifier, then:
        if (charCodeDefinitions.isIdentifierStart(getCharCode(offset), getCharCode(offset + 1), getCharCode(offset + 2))) {
            // Create a <dimension-token> with the same value and type flag as number, and a unit set initially to the empty string.
            // Consume a name. Set the <dimension-token>’s unit to the returned value.
            // Return the <dimension-token>.
            type = types.Dimension;
            offset = utils.consumeName(source, offset);
            return;
        }

        // Otherwise, if the next input code point is U+0025 PERCENTAGE SIGN (%), consume it.
        if (getCharCode(offset) === 0x0025) {
            // Create a <percentage-token> with the same value as number, and return it.
            type = types.Percentage;
            offset++;
            return;
        }

        // Otherwise, create a <number-token> with the same value and type flag as number, and return it.
        type = types.Number;
    }

    // § 4.3.4. Consume an ident-like token
    function consumeIdentLikeToken() {
        const nameStartOffset = offset;

        // Consume a name, and let string be the result.
        offset = utils.consumeName(source, offset);

        // If string’s value is an ASCII case-insensitive match for "url",
        // and the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
        if (utils.cmpStr(source, nameStartOffset, offset, 'url') && getCharCode(offset) === 0x0028) {
            // While the next two input code points are whitespace, consume the next input code point.
            offset = utils.findWhiteSpaceEnd(source, offset + 1);

            // If the next one or two input code points are U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('),
            // or whitespace followed by U+0022 QUOTATION MARK (") or U+0027 APOSTROPHE ('),
            // then create a <function-token> with its value set to string and return it.
            if (getCharCode(offset) === 0x0022 ||
                getCharCode(offset) === 0x0027) {
                type = types.Function;
                offset = nameStartOffset + 4;
                return;
            }

            // Otherwise, consume a url token, and return it.
            consumeUrlToken();
            return;
        }

        // Otherwise, if the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
        // Create a <function-token> with its value set to string and return it.
        if (getCharCode(offset) === 0x0028) {
            type = types.Function;
            offset++;
            return;
        }

        // Otherwise, create an <ident-token> with its value set to string and return it.
        type = types.Ident;
    }

    // § 4.3.5. Consume a string token
    function consumeStringToken(endingCodePoint) {
        // This algorithm may be called with an ending code point, which denotes the code point
        // that ends the string. If an ending code point is not specified,
        // the current input code point is used.
        if (!endingCodePoint) {
            endingCodePoint = getCharCode(offset++);
        }

        // Initially create a <string-token> with its value set to the empty string.
        type = types.String;

        // Repeatedly consume the next input code point from the stream:
        for (; offset < source.length; offset++) {
            const code = source.charCodeAt(offset);

            switch (charCodeDefinitions.charCodeCategory(code)) {
                // ending code point
                case endingCodePoint:
                    // Return the <string-token>.
                    offset++;
                    return;

                    // EOF
                    // case EofCategory:
                    // This is a parse error. Return the <string-token>.
                    // return;

                // newline
                case charCodeDefinitions.WhiteSpaceCategory:
                    if (charCodeDefinitions.isNewline(code)) {
                        // This is a parse error. Reconsume the current input code point,
                        // create a <bad-string-token>, and return it.
                        offset += utils.getNewlineLength(source, offset, code);
                        type = types.BadString;
                        return;
                    }
                    break;

                // U+005C REVERSE SOLIDUS (\)
                case 0x005C:
                    // If the next input code point is EOF, do nothing.
                    if (offset === source.length - 1) {
                        break;
                    }

                    const nextCode = getCharCode(offset + 1);

                    // Otherwise, if the next input code point is a newline, consume it.
                    if (charCodeDefinitions.isNewline(nextCode)) {
                        offset += utils.getNewlineLength(source, offset + 1, nextCode);
                    } else if (charCodeDefinitions.isValidEscape(code, nextCode)) {
                        // Otherwise, (the stream starts with a valid escape) consume
                        // an escaped code point and append the returned code point to
                        // the <string-token>’s value.
                        offset = utils.consumeEscaped(source, offset) - 1;
                    }
                    break;

                // anything else
                // Append the current input code point to the <string-token>’s value.
            }
        }
    }

    // § 4.3.6. Consume a url token
    // Note: This algorithm assumes that the initial "url(" has already been consumed.
    // This algorithm also assumes that it’s being called to consume an "unquoted" value, like url(foo).
    // A quoted value, like url("foo"), is parsed as a <function-token>. Consume an ident-like token
    // automatically handles this distinction; this algorithm shouldn’t be called directly otherwise.
    function consumeUrlToken() {
        // Initially create a <url-token> with its value set to the empty string.
        type = types.Url;

        // Consume as much whitespace as possible.
        offset = utils.findWhiteSpaceEnd(source, offset);

        // Repeatedly consume the next input code point from the stream:
        for (; offset < source.length; offset++) {
            const code = source.charCodeAt(offset);

            switch (charCodeDefinitions.charCodeCategory(code)) {
                // U+0029 RIGHT PARENTHESIS ())
                case 0x0029:
                    // Return the <url-token>.
                    offset++;
                    return;

                    // EOF
                    // case EofCategory:
                    // This is a parse error. Return the <url-token>.
                    // return;

                // whitespace
                case charCodeDefinitions.WhiteSpaceCategory:
                    // Consume as much whitespace as possible.
                    offset = utils.findWhiteSpaceEnd(source, offset);

                    // If the next input code point is U+0029 RIGHT PARENTHESIS ()) or EOF,
                    // consume it and return the <url-token>
                    // (if EOF was encountered, this is a parse error);
                    if (getCharCode(offset) === 0x0029 || offset >= source.length) {
                        if (offset < source.length) {
                            offset++;
                        }
                        return;
                    }

                    // otherwise, consume the remnants of a bad url, create a <bad-url-token>,
                    // and return it.
                    offset = utils.consumeBadUrlRemnants(source, offset);
                    type = types.BadUrl;
                    return;

                // U+0022 QUOTATION MARK (")
                // U+0027 APOSTROPHE (')
                // U+0028 LEFT PARENTHESIS (()
                // non-printable code point
                case 0x0022:
                case 0x0027:
                case 0x0028:
                case charCodeDefinitions.NonPrintableCategory:
                    // This is a parse error. Consume the remnants of a bad url,
                    // create a <bad-url-token>, and return it.
                    offset = utils.consumeBadUrlRemnants(source, offset);
                    type = types.BadUrl;
                    return;

                // U+005C REVERSE SOLIDUS (\)
                case 0x005C:
                    // If the stream starts with a valid escape, consume an escaped code point and
                    // append the returned code point to the <url-token>’s value.
                    if (charCodeDefinitions.isValidEscape(code, getCharCode(offset + 1))) {
                        offset = utils.consumeEscaped(source, offset) - 1;
                        break;
                    }

                    // Otherwise, this is a parse error. Consume the remnants of a bad url,
                    // create a <bad-url-token>, and return it.
                    offset = utils.consumeBadUrlRemnants(source, offset);
                    type = types.BadUrl;
                    return;

                // anything else
                // Append the current input code point to the <url-token>’s value.
            }
        }
    }

    // ensure source is a string
    source = String(source || '');

    const sourceLength = source.length;
    let start = charCodeDefinitions.isBOM(getCharCode(0));
    let offset = start;
    let type;

    // https://drafts.csswg.org/css-syntax-3/#consume-token
    // § 4.3.1. Consume a token
    while (offset < sourceLength) {
        const code = source.charCodeAt(offset);

        switch (charCodeDefinitions.charCodeCategory(code)) {
            // whitespace
            case charCodeDefinitions.WhiteSpaceCategory:
                // Consume as much whitespace as possible. Return a <whitespace-token>.
                type = types.WhiteSpace;
                offset = utils.findWhiteSpaceEnd(source, offset + 1);
                break;

            // U+0022 QUOTATION MARK (")
            case 0x0022:
                // Consume a string token and return it.
                consumeStringToken();
                break;

            // U+0023 NUMBER SIGN (#)
            case 0x0023:
                // If the next input code point is a name code point or the next two input code points are a valid escape, then:
                if (charCodeDefinitions.isName(getCharCode(offset + 1)) || charCodeDefinitions.isValidEscape(getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // Create a <hash-token>.
                    type = types.Hash;

                    // If the next 3 input code points would start an identifier, set the <hash-token>’s type flag to "id".
                    // if (isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
                    //     // TODO: set id flag
                    // }

                    // Consume a name, and set the <hash-token>’s value to the returned string.
                    offset = utils.consumeName(source, offset + 1);

                    // Return the <hash-token>.
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = types.Delim;
                    offset++;
                }

                break;

            // U+0027 APOSTROPHE (')
            case 0x0027:
                // Consume a string token and return it.
                consumeStringToken();
                break;

            // U+0028 LEFT PARENTHESIS (()
            case 0x0028:
                // Return a <(-token>.
                type = types.LeftParenthesis;
                offset++;
                break;

            // U+0029 RIGHT PARENTHESIS ())
            case 0x0029:
                // Return a <)-token>.
                type = types.RightParenthesis;
                offset++;
                break;

            // U+002B PLUS SIGN (+)
            case 0x002B:
                // If the input stream starts with a number, ...
                if (charCodeDefinitions.isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // ... reconsume the current input code point, consume a numeric token, and return it.
                    consumeNumericToken();
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = types.Delim;
                    offset++;
                }
                break;

            // U+002C COMMA (,)
            case 0x002C:
                // Return a <comma-token>.
                type = types.Comma;
                offset++;
                break;

            // U+002D HYPHEN-MINUS (-)
            case 0x002D:
                // If the input stream starts with a number, reconsume the current input code point, consume a numeric token, and return it.
                if (charCodeDefinitions.isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    consumeNumericToken();
                } else {
                    // Otherwise, if the next 2 input code points are U+002D HYPHEN-MINUS U+003E GREATER-THAN SIGN (->), consume them and return a <CDC-token>.
                    if (getCharCode(offset + 1) === 0x002D &&
                        getCharCode(offset + 2) === 0x003E) {
                        type = types.CDC;
                        offset = offset + 3;
                    } else {
                        // Otherwise, if the input stream starts with an identifier, ...
                        if (charCodeDefinitions.isIdentifierStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                            // ... reconsume the current input code point, consume an ident-like token, and return it.
                            consumeIdentLikeToken();
                        } else {
                            // Otherwise, return a <delim-token> with its value set to the current input code point.
                            type = types.Delim;
                            offset++;
                        }
                    }
                }
                break;

            // U+002E FULL STOP (.)
            case 0x002E:
                // If the input stream starts with a number, ...
                if (charCodeDefinitions.isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // ... reconsume the current input code point, consume a numeric token, and return it.
                    consumeNumericToken();
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = types.Delim;
                    offset++;
                }

                break;

            // U+002F SOLIDUS (/)
            case 0x002F:
                // If the next two input code point are U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*),
                if (getCharCode(offset + 1) === 0x002A) {
                    // ... consume them and all following code points up to and including the first U+002A ASTERISK (*)
                    // followed by a U+002F SOLIDUS (/), or up to an EOF code point.
                    type = types.Comment;
                    offset = source.indexOf('*/', offset + 2);
                    offset = offset === -1 ? source.length : offset + 2;
                } else {
                    type = types.Delim;
                    offset++;
                }
                break;

            // U+003A COLON (:)
            case 0x003A:
                // Return a <colon-token>.
                type = types.Colon;
                offset++;
                break;

            // U+003B SEMICOLON (;)
            case 0x003B:
                // Return a <semicolon-token>.
                type = types.Semicolon;
                offset++;
                break;

            // U+003C LESS-THAN SIGN (<)
            case 0x003C:
                // If the next 3 input code points are U+0021 EXCLAMATION MARK U+002D HYPHEN-MINUS U+002D HYPHEN-MINUS (!--), ...
                if (getCharCode(offset + 1) === 0x0021 &&
                    getCharCode(offset + 2) === 0x002D &&
                    getCharCode(offset + 3) === 0x002D) {
                    // ... consume them and return a <CDO-token>.
                    type = types.CDO;
                    offset = offset + 4;
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = types.Delim;
                    offset++;
                }

                break;

            // U+0040 COMMERCIAL AT (@)
            case 0x0040:
                // If the next 3 input code points would start an identifier, ...
                if (charCodeDefinitions.isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
                    // ... consume a name, create an <at-keyword-token> with its value set to the returned value, and return it.
                    type = types.AtKeyword;
                    offset = utils.consumeName(source, offset + 1);
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = types.Delim;
                    offset++;
                }

                break;

            // U+005B LEFT SQUARE BRACKET ([)
            case 0x005B:
                // Return a <[-token>.
                type = types.LeftSquareBracket;
                offset++;
                break;

            // U+005C REVERSE SOLIDUS (\)
            case 0x005C:
                // If the input stream starts with a valid escape, ...
                if (charCodeDefinitions.isValidEscape(code, getCharCode(offset + 1))) {
                    // ... reconsume the current input code point, consume an ident-like token, and return it.
                    consumeIdentLikeToken();
                } else {
                    // Otherwise, this is a parse error. Return a <delim-token> with its value set to the current input code point.
                    type = types.Delim;
                    offset++;
                }
                break;

            // U+005D RIGHT SQUARE BRACKET (])
            case 0x005D:
                // Return a <]-token>.
                type = types.RightSquareBracket;
                offset++;
                break;

            // U+007B LEFT CURLY BRACKET ({)
            case 0x007B:
                // Return a <{-token>.
                type = types.LeftCurlyBracket;
                offset++;
                break;

            // U+007D RIGHT CURLY BRACKET (})
            case 0x007D:
                // Return a <}-token>.
                type = types.RightCurlyBracket;
                offset++;
                break;

            // digit
            case charCodeDefinitions.DigitCategory:
                // Reconsume the current input code point, consume a numeric token, and return it.
                consumeNumericToken();
                break;

            // name-start code point
            case charCodeDefinitions.NameStartCategory:
                // Reconsume the current input code point, consume an ident-like token, and return it.
                consumeIdentLikeToken();
                break;

                // EOF
                // case EofCategory:
                // Return an <EOF-token>.
                // break;

            // anything else
            default:
                // Return a <delim-token> with its value set to the current input code point.
                type = types.Delim;
                offset++;
        }

        // put token to stream
        onToken(type, start, start = offset);
    }
}

exports.AtKeyword = types.AtKeyword;
exports.BadString = types.BadString;
exports.BadUrl = types.BadUrl;
exports.CDC = types.CDC;
exports.CDO = types.CDO;
exports.Colon = types.Colon;
exports.Comma = types.Comma;
exports.Comment = types.Comment;
exports.Delim = types.Delim;
exports.Dimension = types.Dimension;
exports.EOF = types.EOF;
exports.Function = types.Function;
exports.Hash = types.Hash;
exports.Ident = types.Ident;
exports.LeftCurlyBracket = types.LeftCurlyBracket;
exports.LeftParenthesis = types.LeftParenthesis;
exports.LeftSquareBracket = types.LeftSquareBracket;
exports.Number = types.Number;
exports.Percentage = types.Percentage;
exports.RightCurlyBracket = types.RightCurlyBracket;
exports.RightParenthesis = types.RightParenthesis;
exports.RightSquareBracket = types.RightSquareBracket;
exports.Semicolon = types.Semicolon;
exports.String = types.String;
exports.Url = types.Url;
exports.WhiteSpace = types.WhiteSpace;
exports.tokenTypes = types;
exports.DigitCategory = charCodeDefinitions.DigitCategory;
exports.EofCategory = charCodeDefinitions.EofCategory;
exports.NameStartCategory = charCodeDefinitions.NameStartCategory;
exports.NonPrintableCategory = charCodeDefinitions.NonPrintableCategory;
exports.WhiteSpaceCategory = charCodeDefinitions.WhiteSpaceCategory;
exports.charCodeCategory = charCodeDefinitions.charCodeCategory;
exports.isBOM = charCodeDefinitions.isBOM;
exports.isDigit = charCodeDefinitions.isDigit;
exports.isHexDigit = charCodeDefinitions.isHexDigit;
exports.isIdentifierStart = charCodeDefinitions.isIdentifierStart;
exports.isLetter = charCodeDefinitions.isLetter;
exports.isLowercaseLetter = charCodeDefinitions.isLowercaseLetter;
exports.isName = charCodeDefinitions.isName;
exports.isNameStart = charCodeDefinitions.isNameStart;
exports.isNewline = charCodeDefinitions.isNewline;
exports.isNonAscii = charCodeDefinitions.isNonAscii;
exports.isNonPrintable = charCodeDefinitions.isNonPrintable;
exports.isNumberStart = charCodeDefinitions.isNumberStart;
exports.isUppercaseLetter = charCodeDefinitions.isUppercaseLetter;
exports.isValidEscape = charCodeDefinitions.isValidEscape;
exports.isWhiteSpace = charCodeDefinitions.isWhiteSpace;
exports.cmpChar = utils.cmpChar;
exports.cmpStr = utils.cmpStr;
exports.consumeBadUrlRemnants = utils.consumeBadUrlRemnants;
exports.consumeEscaped = utils.consumeEscaped;
exports.consumeName = utils.consumeName;
exports.consumeNumber = utils.consumeNumber;
exports.decodeEscaped = utils.decodeEscaped;
exports.findDecimalNumberEnd = utils.findDecimalNumberEnd;
exports.findWhiteSpaceEnd = utils.findWhiteSpaceEnd;
exports.findWhiteSpaceStart = utils.findWhiteSpaceStart;
exports.getNewlineLength = utils.getNewlineLength;
exports.tokenize = tokenize;


/***/ }),

/***/ 7169:
/***/ ((module) => {

"use strict";


const tokenNames = [
    'EOF-token',
    'ident-token',
    'function-token',
    'at-keyword-token',
    'hash-token',
    'string-token',
    'bad-string-token',
    'url-token',
    'bad-url-token',
    'delim-token',
    'number-token',
    'percentage-token',
    'dimension-token',
    'whitespace-token',
    'CDO-token',
    'CDC-token',
    'colon-token',
    'semicolon-token',
    'comma-token',
    '[-token',
    ']-token',
    '(-token',
    ')-token',
    '{-token',
    '}-token'
];

module.exports = tokenNames;


/***/ }),

/***/ 4764:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


// CSS Syntax Module Level 3
// https://www.w3.org/TR/css-syntax-3/
const EOF = 0;                 // <EOF-token>
const Ident = 1;               // <ident-token>
const Function = 2;            // <function-token>
const AtKeyword = 3;           // <at-keyword-token>
const Hash = 4;                // <hash-token>
const String = 5;              // <string-token>
const BadString = 6;           // <bad-string-token>
const Url = 7;                 // <url-token>
const BadUrl = 8;              // <bad-url-token>
const Delim = 9;               // <delim-token>
const Number = 10;             // <number-token>
const Percentage = 11;         // <percentage-token>
const Dimension = 12;          // <dimension-token>
const WhiteSpace = 13;         // <whitespace-token>
const CDO = 14;                // <CDO-token>
const CDC = 15;                // <CDC-token>
const Colon = 16;              // <colon-token>     :
const Semicolon = 17;          // <semicolon-token> ;
const Comma = 18;              // <comma-token>     ,
const LeftSquareBracket = 19;  // <[-token>
const RightSquareBracket = 20; // <]-token>
const LeftParenthesis = 21;    // <(-token>
const RightParenthesis = 22;   // <)-token>
const LeftCurlyBracket = 23;   // <{-token>
const RightCurlyBracket = 24;  // <}-token>
const Comment = 25;

exports.AtKeyword = AtKeyword;
exports.BadString = BadString;
exports.BadUrl = BadUrl;
exports.CDC = CDC;
exports.CDO = CDO;
exports.Colon = Colon;
exports.Comma = Comma;
exports.Comment = Comment;
exports.Delim = Delim;
exports.Dimension = Dimension;
exports.EOF = EOF;
exports.Function = Function;
exports.Hash = Hash;
exports.Ident = Ident;
exports.LeftCurlyBracket = LeftCurlyBracket;
exports.LeftParenthesis = LeftParenthesis;
exports.LeftSquareBracket = LeftSquareBracket;
exports.Number = Number;
exports.Percentage = Percentage;
exports.RightCurlyBracket = RightCurlyBracket;
exports.RightParenthesis = RightParenthesis;
exports.RightSquareBracket = RightSquareBracket;
exports.Semicolon = Semicolon;
exports.String = String;
exports.Url = Url;
exports.WhiteSpace = WhiteSpace;


/***/ }),

/***/ 9708:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const charCodeDefinitions = __webpack_require__(7154);

function getCharCode(source, offset) {
    return offset < source.length ? source.charCodeAt(offset) : 0;
}

function getNewlineLength(source, offset, code) {
    if (code === 13 /* \r */ && getCharCode(source, offset + 1) === 10 /* \n */) {
        return 2;
    }

    return 1;
}

function cmpChar(testStr, offset, referenceCode) {
    let code = testStr.charCodeAt(offset);

    // code.toLowerCase() for A..Z
    if (charCodeDefinitions.isUppercaseLetter(code)) {
        code = code | 32;
    }

    return code === referenceCode;
}

function cmpStr(testStr, start, end, referenceStr) {
    if (end - start !== referenceStr.length) {
        return false;
    }

    if (start < 0 || end > testStr.length) {
        return false;
    }

    for (let i = start; i < end; i++) {
        const referenceCode = referenceStr.charCodeAt(i - start);
        let testCode = testStr.charCodeAt(i);

        // testCode.toLowerCase() for A..Z
        if (charCodeDefinitions.isUppercaseLetter(testCode)) {
            testCode = testCode | 32;
        }

        if (testCode !== referenceCode) {
            return false;
        }
    }

    return true;
}

function findWhiteSpaceStart(source, offset) {
    for (; offset >= 0; offset--) {
        if (!charCodeDefinitions.isWhiteSpace(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset + 1;
}

function findWhiteSpaceEnd(source, offset) {
    for (; offset < source.length; offset++) {
        if (!charCodeDefinitions.isWhiteSpace(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset;
}

function findDecimalNumberEnd(source, offset) {
    for (; offset < source.length; offset++) {
        if (!charCodeDefinitions.isDigit(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset;
}

// § 4.3.7. Consume an escaped code point
function consumeEscaped(source, offset) {
    // It assumes that the U+005C REVERSE SOLIDUS (\) has already been consumed and
    // that the next input code point has already been verified to be part of a valid escape.
    offset += 2;

    // hex digit
    if (charCodeDefinitions.isHexDigit(getCharCode(source, offset - 1))) {
        // Consume as many hex digits as possible, but no more than 5.
        // Note that this means 1-6 hex digits have been consumed in total.
        for (const maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) {
            if (!charCodeDefinitions.isHexDigit(getCharCode(source, offset))) {
                break;
            }
        }

        // If the next input code point is whitespace, consume it as well.
        const code = getCharCode(source, offset);
        if (charCodeDefinitions.isWhiteSpace(code)) {
            offset += getNewlineLength(source, offset, code);
        }
    }

    return offset;
}

// §4.3.11. Consume a name
// Note: This algorithm does not do the verification of the first few code points that are necessary
// to ensure the returned code points would constitute an <ident-token>. If that is the intended use,
// ensure that the stream starts with an identifier before calling this algorithm.
function consumeName(source, offset) {
    // Let result initially be an empty string.
    // Repeatedly consume the next input code point from the stream:
    for (; offset < source.length; offset++) {
        const code = source.charCodeAt(offset);

        // name code point
        if (charCodeDefinitions.isName(code)) {
            // Append the code point to result.
            continue;
        }

        // the stream starts with a valid escape
        if (charCodeDefinitions.isValidEscape(code, getCharCode(source, offset + 1))) {
            // Consume an escaped code point. Append the returned code point to result.
            offset = consumeEscaped(source, offset) - 1;
            continue;
        }

        // anything else
        // Reconsume the current input code point. Return result.
        break;
    }

    return offset;
}

// §4.3.12. Consume a number
function consumeNumber(source, offset) {
    let code = source.charCodeAt(offset);

    // 2. If the next input code point is U+002B PLUS SIGN (+) or U+002D HYPHEN-MINUS (-),
    // consume it and append it to repr.
    if (code === 0x002B || code === 0x002D) {
        code = source.charCodeAt(offset += 1);
    }

    // 3. While the next input code point is a digit, consume it and append it to repr.
    if (charCodeDefinitions.isDigit(code)) {
        offset = findDecimalNumberEnd(source, offset + 1);
        code = source.charCodeAt(offset);
    }

    // 4. If the next 2 input code points are U+002E FULL STOP (.) followed by a digit, then:
    if (code === 0x002E && charCodeDefinitions.isDigit(source.charCodeAt(offset + 1))) {
        // 4.1 Consume them.
        // 4.2 Append them to repr.
        offset += 2;

        // 4.3 Set type to "number".
        // TODO

        // 4.4 While the next input code point is a digit, consume it and append it to repr.

        offset = findDecimalNumberEnd(source, offset);
    }

    // 5. If the next 2 or 3 input code points are U+0045 LATIN CAPITAL LETTER E (E)
    // or U+0065 LATIN SMALL LETTER E (e), ... , followed by a digit, then:
    if (cmpChar(source, offset, 101 /* e */)) {
        let sign = 0;
        code = source.charCodeAt(offset + 1);

        // ... optionally followed by U+002D HYPHEN-MINUS (-) or U+002B PLUS SIGN (+) ...
        if (code === 0x002D || code === 0x002B) {
            sign = 1;
            code = source.charCodeAt(offset + 2);
        }

        // ... followed by a digit
        if (charCodeDefinitions.isDigit(code)) {
            // 5.1 Consume them.
            // 5.2 Append them to repr.

            // 5.3 Set type to "number".
            // TODO

            // 5.4 While the next input code point is a digit, consume it and append it to repr.
            offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
        }
    }

    return offset;
}

// § 4.3.14. Consume the remnants of a bad url
// ... its sole use is to consume enough of the input stream to reach a recovery point
// where normal tokenizing can resume.
function consumeBadUrlRemnants(source, offset) {
    // Repeatedly consume the next input code point from the stream:
    for (; offset < source.length; offset++) {
        const code = source.charCodeAt(offset);

        // U+0029 RIGHT PARENTHESIS ())
        // EOF
        if (code === 0x0029) {
            // Return.
            offset++;
            break;
        }

        if (charCodeDefinitions.isValidEscape(code, getCharCode(source, offset + 1))) {
            // Consume an escaped code point.
            // Note: This allows an escaped right parenthesis ("\)") to be encountered
            // without ending the <bad-url-token>. This is otherwise identical to
            // the "anything else" clause.
            offset = consumeEscaped(source, offset);
        }
    }

    return offset;
}

// § 4.3.7. Consume an escaped code point
// Note: This algorithm assumes that escaped is valid without leading U+005C REVERSE SOLIDUS (\)
function decodeEscaped(escaped) {
    // Single char escaped that's not a hex digit
    if (escaped.length === 1 && !charCodeDefinitions.isHexDigit(escaped.charCodeAt(0))) {
        return escaped[0];
    }

    // Interpret the hex digits as a hexadecimal number.
    let code = parseInt(escaped, 16);

    if (
        (code === 0) ||                       // If this number is zero,
        (code >= 0xD800 && code <= 0xDFFF) || // or is for a surrogate,
        (code > 0x10FFFF)                     // or is greater than the maximum allowed code point
    ) {
        // ... return U+FFFD REPLACEMENT CHARACTER
        code = 0xFFFD;
    }

    // Otherwise, return the code point with that value.
    return String.fromCodePoint(code);
}

exports.cmpChar = cmpChar;
exports.cmpStr = cmpStr;
exports.consumeBadUrlRemnants = consumeBadUrlRemnants;
exports.consumeEscaped = consumeEscaped;
exports.consumeName = consumeName;
exports.consumeNumber = consumeNumber;
exports.decodeEscaped = decodeEscaped;
exports.findDecimalNumberEnd = findDecimalNumberEnd;
exports.findWhiteSpaceEnd = findWhiteSpaceEnd;
exports.findWhiteSpaceStart = findWhiteSpaceStart;
exports.getNewlineLength = getNewlineLength;


/***/ }),

/***/ 2080:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


//
//                              list
//                            ┌──────┐
//             ┌──────────────┼─head │
//             │              │ tail─┼──────────────┐
//             │              └──────┘              │
//             ▼                                    ▼
//            item        item        item        item
//          ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐
//  null ◀──┼─prev │◀───┼─prev │◀───┼─prev │◀───┼─prev │
//          │ next─┼───▶│ next─┼───▶│ next─┼───▶│ next─┼──▶ null
//          ├──────┤    ├──────┤    ├──────┤    ├──────┤
//          │ data │    │ data │    │ data │    │ data │
//          └──────┘    └──────┘    └──────┘    └──────┘
//

let releasedCursors = null;

class List {
    static createItem(data) {
        return {
            prev: null,
            next: null,
            data
        };
    }

    constructor() {
        this.head = null;
        this.tail = null;
        this.cursor = null;
    }
    createItem(data) {
        return List.createItem(data);
    }

    // cursor helpers
    allocateCursor(prev, next) {
        let cursor;

        if (releasedCursors !== null) {
            cursor = releasedCursors;
            releasedCursors = releasedCursors.cursor;
            cursor.prev = prev;
            cursor.next = next;
            cursor.cursor = this.cursor;
        } else {
            cursor = {
                prev,
                next,
                cursor: this.cursor
            };
        }

        this.cursor = cursor;

        return cursor;
    }
    releaseCursor() {
        const { cursor } = this;

        this.cursor = cursor.cursor;
        cursor.prev = null;
        cursor.next = null;
        cursor.cursor = releasedCursors;
        releasedCursors = cursor;
    }
    updateCursors(prevOld, prevNew, nextOld, nextNew) {
        let { cursor } = this;

        while (cursor !== null) {
            if (cursor.prev === prevOld) {
                cursor.prev = prevNew;
            }

            if (cursor.next === nextOld) {
                cursor.next = nextNew;
            }

            cursor = cursor.cursor;
        }
    }
    *[Symbol.iterator]() {
        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            yield cursor.data;
        }
    }

    // getters
    get size() {
        let size = 0;

        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            size++;
        }

        return size;
    }
    get isEmpty() {
        return this.head === null;
    }
    get first() {
        return this.head && this.head.data;
    }
    get last() {
        return this.tail && this.tail.data;
    }

    // convertors
    fromArray(array) {
        let cursor = null;
        this.head = null;

        for (let data of array) {
            const item = List.createItem(data);

            if (cursor !== null) {
                cursor.next = item;
            } else {
                this.head = item;
            }

            item.prev = cursor;
            cursor = item;
        }

        this.tail = cursor;
        return this;
    }
    toArray() {
        return [...this];
    }
    toJSON() {
        return [...this];
    }

    // array-like methods
    forEach(fn, thisArg = this) {
        // push cursor
        const cursor = this.allocateCursor(null, this.head);

        while (cursor.next !== null) {
            const item = cursor.next;
            cursor.next = item.next;
            fn.call(thisArg, item.data, item, this);
        }

        // pop cursor
        this.releaseCursor();
    }
    forEachRight(fn, thisArg = this) {
        // push cursor
        const cursor = this.allocateCursor(this.tail, null);

        while (cursor.prev !== null) {
            const item = cursor.prev;
            cursor.prev = item.prev;
            fn.call(thisArg, item.data, item, this);
        }

        // pop cursor
        this.releaseCursor();
    }
    reduce(fn, initialValue, thisArg = this) {
        // push cursor
        let cursor = this.allocateCursor(null, this.head);
        let acc = initialValue;
        let item;

        while (cursor.next !== null) {
            item = cursor.next;
            cursor.next = item.next;

            acc = fn.call(thisArg, acc, item.data, item, this);
        }

        // pop cursor
        this.releaseCursor();

        return acc;
    }
    reduceRight(fn, initialValue, thisArg = this) {
        // push cursor
        let cursor = this.allocateCursor(this.tail, null);
        let acc = initialValue;
        let item;

        while (cursor.prev !== null) {
            item = cursor.prev;
            cursor.prev = item.prev;

            acc = fn.call(thisArg, acc, item.data, item, this);
        }

        // pop cursor
        this.releaseCursor();

        return acc;
    }
    some(fn, thisArg = this) {
        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            if (fn.call(thisArg, cursor.data, cursor, this)) {
                return true;
            }
        }

        return false;
    }
    map(fn, thisArg = this) {
        const result = new List();

        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            result.appendData(fn.call(thisArg, cursor.data, cursor, this));
        }

        return result;
    }
    filter(fn, thisArg = this) {
        const result = new List();

        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            if (fn.call(thisArg, cursor.data, cursor, this)) {
                result.appendData(cursor.data);
            }
        }

        return result;
    }

    nextUntil(start, fn, thisArg = this) {
        if (start === null) {
            return;
        }

        // push cursor
        const cursor = this.allocateCursor(null, start);

        while (cursor.next !== null) {
            const item = cursor.next;
            cursor.next = item.next;
            if (fn.call(thisArg, item.data, item, this)) {
                break;
            }
        }

        // pop cursor
        this.releaseCursor();
    }
    prevUntil(start, fn, thisArg = this) {
        if (start === null) {
            return;
        }

        // push cursor
        const cursor = this.allocateCursor(start, null);

        while (cursor.prev !== null) {
            const item = cursor.prev;
            cursor.prev = item.prev;
            if (fn.call(thisArg, item.data, item, this)) {
                break;
            }
        }

        // pop cursor
        this.releaseCursor();
    }

    // mutation
    clear() {
        this.head = null;
        this.tail = null;
    }
    copy() {
        const result = new List();

        for (let data of this) {
            result.appendData(data);
        }

        return result;
    }
    prepend(item) {
        //      head
        //    ^
        // item
        this.updateCursors(null, item, this.head, item);

        // insert to the beginning of the list
        if (this.head !== null) {
            // new item <- first item
            this.head.prev = item;
            // new item -> first item
            item.next = this.head;
        } else {
            // if list has no head, then it also has no tail
            // in this case tail points to the new item
            this.tail = item;
        }

        // head always points to new item
        this.head = item;
        return this;
    }
    prependData(data) {
        return this.prepend(List.createItem(data));
    }
    append(item) {
        return this.insert(item);
    }
    appendData(data) {
        return this.insert(List.createItem(data));
    }
    insert(item, before = null) {
        if (before !== null) {
            // prev   before
            //      ^
            //     item
            this.updateCursors(before.prev, item, before, item);

            if (before.prev === null) {
                // insert to the beginning of list
                if (this.head !== before) {
                    throw new Error('before doesn\'t belong to list');
                }
                // since head points to before therefore list doesn't empty
                // no need to check tail
                this.head = item;
                before.prev = item;
                item.next = before;
                this.updateCursors(null, item);
            } else {
                // insert between two items
                before.prev.next = item;
                item.prev = before.prev;
                before.prev = item;
                item.next = before;
            }
        } else {
            // tail
            //      ^
            //      item
            this.updateCursors(this.tail, item, null, item);

            // insert to the ending of the list
            if (this.tail !== null) {
                // last item -> new item
                this.tail.next = item;
                // last item <- new item
                item.prev = this.tail;
            } else {
                // if list has no tail, then it also has no head
                // in this case head points to new item
                this.head = item;
            }

            // tail always points to new item
            this.tail = item;
        }

        return this;
    }
    insertData(data, before) {
        return this.insert(List.createItem(data), before);
    }
    remove(item) {
        //      item
        //       ^
        // prev     next
        this.updateCursors(item, item.prev, item, item.next);

        if (item.prev !== null) {
            item.prev.next = item.next;
        } else {
            if (this.head !== item) {
                throw new Error('item doesn\'t belong to list');
            }

            this.head = item.next;
        }

        if (item.next !== null) {
            item.next.prev = item.prev;
        } else {
            if (this.tail !== item) {
                throw new Error('item doesn\'t belong to list');
            }

            this.tail = item.prev;
        }

        item.prev = null;
        item.next = null;

        return item;
    }
    push(data) {
        this.insert(List.createItem(data));
    }
    pop() {
        return this.tail !== null ? this.remove(this.tail) : null;
    }
    unshift(data) {
        this.prepend(List.createItem(data));
    }
    shift() {
        return this.head !== null ? this.remove(this.head) : null;
    }
    prependList(list) {
        return this.insertList(list, this.head);
    }
    appendList(list) {
        return this.insertList(list);
    }
    insertList(list, before) {
        // ignore empty lists
        if (list.head === null) {
            return this;
        }

        if (before !== undefined && before !== null) {
            this.updateCursors(before.prev, list.tail, before, list.head);

            // insert in the middle of dist list
            if (before.prev !== null) {
                // before.prev <-> list.head
                before.prev.next = list.head;
                list.head.prev = before.prev;
            } else {
                this.head = list.head;
            }

            before.prev = list.tail;
            list.tail.next = before;
        } else {
            this.updateCursors(this.tail, list.tail, null, list.head);

            // insert to end of the list
            if (this.tail !== null) {
                // if destination list has a tail, then it also has a head,
                // but head doesn't change
                // dest tail -> source head
                this.tail.next = list.head;
                // dest tail <- source head
                list.head.prev = this.tail;
            } else {
                // if list has no a tail, then it also has no a head
                // in this case points head to new item
                this.head = list.head;
            }

            // tail always start point to new item
            this.tail = list.tail;
        }

        list.head = null;
        list.tail = null;
        return this;
    }
    replace(oldItem, newItemOrList) {
        if ('head' in newItemOrList) {
            this.insertList(newItemOrList, oldItem);
        } else {
            this.insert(newItemOrList, oldItem);
        }

        this.remove(oldItem);
    }
}

exports.List = List;


/***/ }),

/***/ 6315:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const List = __webpack_require__(2080);

function clone(node) {
    const result = {};

    for (const key in node) {
        let value = node[key];

        if (value) {
            if (Array.isArray(value) || value instanceof List.List) {
                value = value.map(clone);
            } else if (value.constructor === Object) {
                value = clone(value);
            }
        }

        result[key] = value;
    }

    return result;
}

exports.clone = clone;


/***/ }),

/***/ 7324:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function createCustomError(name, message) {
    // use Object.create(), because some VMs prevent setting line/column otherwise
    // (iOS Safari 10 even throws an exception)
    const error = Object.create(SyntaxError.prototype);
    const errorStack = new Error();

    return Object.assign(error, {
        name,
        message,
        get stack() {
            return (errorStack.stack || '').replace(/^(.+\n){1,3}/, `${name}: ${message}\n`);
        }
    });
}

exports.createCustomError = createCustomError;


/***/ }),

/***/ 8866:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const charCodeDefinitions = __webpack_require__(7154);
const utils = __webpack_require__(9708);

const REVERSE_SOLIDUS = 0x005c; // U+005C REVERSE SOLIDUS (\)

function decode(str) {
    const end = str.length - 1;
    let decoded = '';

    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);

        if (code === REVERSE_SOLIDUS) {
            // special case at the ending
            if (i === end) {
                // if the next input code point is EOF, do nothing
                break;
            }

            code = str.charCodeAt(++i);

            // consume escaped
            if (charCodeDefinitions.isValidEscape(REVERSE_SOLIDUS, code)) {
                const escapeStart = i - 1;
                const escapeEnd = utils.consumeEscaped(str, escapeStart);

                i = escapeEnd - 1;
                decoded += utils.decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
            } else {
                // \r\n
                if (code === 0x000d && str.charCodeAt(i + 1) === 0x000a) {
                    i++;
                }
            }
        } else {
            decoded += str[i];
        }
    }

    return decoded;
}

// https://drafts.csswg.org/cssom/#serialize-an-identifier
// § 2.1. Common Serializing Idioms
function encode(str) {
    let encoded = '';

    // If the character is the first character and is a "-" (U+002D),
    // and there is no second character, then the escaped character.
    // Note: That's means a single dash string "-" return as escaped dash,
    // so move the condition out of the main loop
    if (str.length === 1 && str.charCodeAt(0) === 0x002D) {
        return '\\-';
    }

    // To serialize an identifier means to create a string represented
    // by the concatenation of, for each character of the identifier:
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER (U+FFFD).
        if (code === 0x0000) {
            encoded += '\uFFFD';
            continue;
        }

        if (
            // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F ...
            // Note: Do not compare with 0x0001 since 0x0000 is precessed before
            code <= 0x001F || code === 0x007F ||
            // [or] ... is in the range [0-9] (U+0030 to U+0039),
            (code >= 0x0030 && code <= 0x0039 && (
                // If the character is the first character ...
                i === 0 ||
                // If the character is the second character ... and the first character is a "-" (U+002D)
                i === 1 && str.charCodeAt(0) === 0x002D
            ))
        ) {
            // ... then the character escaped as code point.
            encoded += '\\' + code.toString(16) + ' ';
            continue;
        }

        // If the character is not handled by one of the above rules and is greater
        // than or equal to U+0080, is "-" (U+002D) or "_" (U+005F), or is in one
        // of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to U+005A),
        // or \[a-z] (U+0061 to U+007A), then the character itself.
        if (charCodeDefinitions.isName(code)) {
            encoded += str.charAt(i);
        } else {
            // Otherwise, the escaped character.
            encoded += '\\' + str.charAt(i);
        }
    }

    return encoded;
}

exports.decode = decode;
exports.encode = encode;


/***/ }),

/***/ 2543:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const keywords = new Map();
const properties = new Map();
const HYPHENMINUS = 45; // '-'.charCodeAt()

const keyword = getKeywordDescriptor;
const property = getPropertyDescriptor;
const vendorPrefix = getVendorPrefix;
function isCustomProperty(str, offset) {
    offset = offset || 0;

    return str.length - offset >= 2 &&
           str.charCodeAt(offset) === HYPHENMINUS &&
           str.charCodeAt(offset + 1) === HYPHENMINUS;
}

function getVendorPrefix(str, offset) {
    offset = offset || 0;

    // verdor prefix should be at least 3 chars length
    if (str.length - offset >= 3) {
        // vendor prefix starts with hyper minus following non-hyper minus
        if (str.charCodeAt(offset) === HYPHENMINUS &&
            str.charCodeAt(offset + 1) !== HYPHENMINUS) {
            // vendor prefix should contain a hyper minus at the ending
            const secondDashIndex = str.indexOf('-', offset + 2);

            if (secondDashIndex !== -1) {
                return str.substring(offset, secondDashIndex + 1);
            }
        }
    }

    return '';
}

function getKeywordDescriptor(keyword) {
    if (keywords.has(keyword)) {
        return keywords.get(keyword);
    }

    const name = keyword.toLowerCase();
    let descriptor = keywords.get(name);

    if (descriptor === undefined) {
        const custom = isCustomProperty(name, 0);
        const vendor = !custom ? getVendorPrefix(name, 0) : '';
        descriptor = Object.freeze({
            basename: name.substr(vendor.length),
            name,
            prefix: vendor,
            vendor,
            custom
        });
    }

    keywords.set(keyword, descriptor);

    return descriptor;
}

function getPropertyDescriptor(property) {
    if (properties.has(property)) {
        return properties.get(property);
    }

    let name = property;
    let hack = property[0];

    if (hack === '/') {
        hack = property[1] === '/' ? '//' : '/';
    } else if (hack !== '_' &&
               hack !== '*' &&
               hack !== '$' &&
               hack !== '#' &&
               hack !== '+' &&
               hack !== '&') {
        hack = '';
    }

    const custom = isCustomProperty(name, hack.length);

    // re-use result when possible (the same as for lower case)
    if (!custom) {
        name = name.toLowerCase();
        if (properties.has(name)) {
            const descriptor = properties.get(name);
            properties.set(property, descriptor);
            return descriptor;
        }
    }

    const vendor = !custom ? getVendorPrefix(name, hack.length) : '';
    const prefix = name.substr(0, hack.length + vendor.length);
    const descriptor = Object.freeze({
        basename: name.substr(prefix.length),
        name: name.substr(hack.length),
        hack,
        vendor,
        prefix,
        custom
    });

    properties.set(property, descriptor);

    return descriptor;
}

exports.isCustomProperty = isCustomProperty;
exports.keyword = keyword;
exports.property = property;
exports.vendorPrefix = vendorPrefix;


/***/ }),

/***/ 1705:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const charCodeDefinitions = __webpack_require__(7154);
const utils = __webpack_require__(9708);

const REVERSE_SOLIDUS = 0x005c; // U+005C REVERSE SOLIDUS (\)
const QUOTATION_MARK = 0x0022;  // "
const APOSTROPHE = 0x0027;      // '

function decode(str) {
    const len = str.length;
    const firstChar = str.charCodeAt(0);
    const start = firstChar === QUOTATION_MARK || firstChar === APOSTROPHE ? 1 : 0;
    const end = start === 1 && len > 1 && str.charCodeAt(len - 1) === firstChar ? len - 2 : len - 1;
    let decoded = '';

    for (let i = start; i <= end; i++) {
        let code = str.charCodeAt(i);

        if (code === REVERSE_SOLIDUS) {
            // special case at the ending
            if (i === end) {
                // if the next input code point is EOF, do nothing
                // otherwise include last quote as escaped
                if (i !== len - 1) {
                    decoded = str.substr(i + 1);
                }
                break;
            }

            code = str.charCodeAt(++i);

            // consume escaped
            if (charCodeDefinitions.isValidEscape(REVERSE_SOLIDUS, code)) {
                const escapeStart = i - 1;
                const escapeEnd = utils.consumeEscaped(str, escapeStart);

                i = escapeEnd - 1;
                decoded += utils.decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
            } else {
                // \r\n
                if (code === 0x000d && str.charCodeAt(i + 1) === 0x000a) {
                    i++;
                }
            }
        } else {
            decoded += str[i];
        }
    }

    return decoded;
}

// https://drafts.csswg.org/cssom/#serialize-a-string
// § 2.1. Common Serializing Idioms
function encode(str, apostrophe) {
    const quote = apostrophe ? '\'' : '"';
    const quoteCode = apostrophe ? APOSTROPHE : QUOTATION_MARK;
    let encoded = '';
    let wsBeforeHexIsNeeded = false;

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER (U+FFFD).
        if (code === 0x0000) {
            encoded += '\uFFFD';
            continue;
        }

        // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F,
        // the character escaped as code point.
        // Note: Do not compare with 0x0001 since 0x0000 is precessed before
        if (code <= 0x001f || code === 0x007F) {
            encoded += '\\' + code.toString(16);
            wsBeforeHexIsNeeded = true;
            continue;
        }

        // If the character is '"' (U+0022) or "\" (U+005C), the escaped character.
        if (code === quoteCode || code === REVERSE_SOLIDUS) {
            encoded += '\\' + str.charAt(i);
            wsBeforeHexIsNeeded = false;
        } else {
            if (wsBeforeHexIsNeeded && (charCodeDefinitions.isHexDigit(code) || charCodeDefinitions.isWhiteSpace(code))) {
                encoded += ' ';
            }

            // Otherwise, the character itself.
            encoded += str.charAt(i);
            wsBeforeHexIsNeeded = false;
        }
    }

    return quote + encoded + quote;
}

exports.decode = decode;
exports.encode = encode;


/***/ }),

/***/ 213:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const charCodeDefinitions = __webpack_require__(7154);
const utils = __webpack_require__(9708);

const SPACE = 0x0020;            // U+0020 SPACE
const REVERSE_SOLIDUS = 0x005c;  // U+005C REVERSE SOLIDUS (\)
const QUOTATION_MARK = 0x0022;   // "
const APOSTROPHE = 0x0027;       // '
const LEFTPARENTHESIS = 0x0028;  // U+0028 LEFT PARENTHESIS (()
const RIGHTPARENTHESIS = 0x0029; // U+0029 RIGHT PARENTHESIS ())

function decode(str) {
    const len = str.length;
    let start = 4; // length of "url("
    let end = str.charCodeAt(len - 1) === RIGHTPARENTHESIS ? len - 2 : len - 1;
    let decoded = '';

    while (start < end && charCodeDefinitions.isWhiteSpace(str.charCodeAt(start))) {
        start++;
    }

    while (start < end && charCodeDefinitions.isWhiteSpace(str.charCodeAt(end))) {
        end--;
    }

    for (let i = start; i <= end; i++) {
        let code = str.charCodeAt(i);

        if (code === REVERSE_SOLIDUS) {
            // special case at the ending
            if (i === end) {
                // if the next input code point is EOF, do nothing
                // otherwise include last left parenthesis as escaped
                if (i !== len - 1) {
                    decoded = str.substr(i + 1);
                }
                break;
            }

            code = str.charCodeAt(++i);

            // consume escaped
            if (charCodeDefinitions.isValidEscape(REVERSE_SOLIDUS, code)) {
                const escapeStart = i - 1;
                const escapeEnd = utils.consumeEscaped(str, escapeStart);

                i = escapeEnd - 1;
                decoded += utils.decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
            } else {
                // \r\n
                if (code === 0x000d && str.charCodeAt(i + 1) === 0x000a) {
                    i++;
                }
            }
        } else {
            decoded += str[i];
        }
    }

    return decoded;
}

function encode(str) {
    let encoded = '';
    let wsBeforeHexIsNeeded = false;

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER (U+FFFD).
        if (code === 0x0000) {
            encoded += '\uFFFD';
            continue;
        }

        // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F,
        // the character escaped as code point.
        // Note: Do not compare with 0x0001 since 0x0000 is precessed before
        if (code <= 0x001f || code === 0x007F) {
            encoded += '\\' + code.toString(16);
            wsBeforeHexIsNeeded = true;
            continue;
        }

        if (code === SPACE ||
            code === REVERSE_SOLIDUS ||
            code === QUOTATION_MARK ||
            code === APOSTROPHE ||
            code === LEFTPARENTHESIS ||
            code === RIGHTPARENTHESIS) {
            encoded += '\\' + str.charAt(i);
            wsBeforeHexIsNeeded = false;
        } else {
            if (wsBeforeHexIsNeeded && charCodeDefinitions.isHexDigit(code)) {
                encoded += ' ';
            }

            encoded += str.charAt(i);
            wsBeforeHexIsNeeded = false;
        }
    }

    return 'url(' + encoded + ')';
}

exports.decode = decode;
exports.encode = encode;


/***/ }),

/***/ 9909:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const { version } = __webpack_require__(985);

exports.version = version;


/***/ }),

/***/ 2850:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const { hasOwnProperty } = Object.prototype;
const noop = function() {};

function ensureFunction(value) {
    return typeof value === 'function' ? value : noop;
}

function invokeForType(fn, type) {
    return function(node, item, list) {
        if (node.type === type) {
            fn.call(this, node, item, list);
        }
    };
}

function getWalkersFromStructure(name, nodeType) {
    const structure = nodeType.structure;
    const walkers = [];

    for (const key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        let fieldTypes = structure[key];
        const walker = {
            name: key,
            type: false,
            nullable: false
        };

        if (!Array.isArray(fieldTypes)) {
            fieldTypes = [fieldTypes];
        }

        for (const fieldType of fieldTypes) {
            if (fieldType === null) {
                walker.nullable = true;
            } else if (typeof fieldType === 'string') {
                walker.type = 'node';
            } else if (Array.isArray(fieldType)) {
                walker.type = 'list';
            }
        }

        if (walker.type) {
            walkers.push(walker);
        }
    }

    if (walkers.length) {
        return {
            context: nodeType.walkContext,
            fields: walkers
        };
    }

    return null;
}

function getTypesFromConfig(config) {
    const types = {};

    for (const name in config.node) {
        if (hasOwnProperty.call(config.node, name)) {
            const nodeType = config.node[name];

            if (!nodeType.structure) {
                throw new Error('Missed `structure` field in `' + name + '` node type definition');
            }

            types[name] = getWalkersFromStructure(name, nodeType);
        }
    }

    return types;
}

function createTypeIterator(config, reverse) {
    const fields = config.fields.slice();
    const contextName = config.context;
    const useContext = typeof contextName === 'string';

    if (reverse) {
        fields.reverse();
    }

    return function(node, context, walk, walkReducer) {
        let prevContextValue;

        if (useContext) {
            prevContextValue = context[contextName];
            context[contextName] = node;
        }

        for (const field of fields) {
            const ref = node[field.name];

            if (!field.nullable || ref) {
                if (field.type === 'list') {
                    const breakWalk = reverse
                        ? ref.reduceRight(walkReducer, false)
                        : ref.reduce(walkReducer, false);

                    if (breakWalk) {
                        return true;
                    }
                } else if (walk(ref)) {
                    return true;
                }
            }
        }

        if (useContext) {
            context[contextName] = prevContextValue;
        }
    };
}

function createFastTraveralMap({
    StyleSheet,
    Atrule,
    Rule,
    Block,
    DeclarationList
}) {
    return {
        Atrule: {
            StyleSheet,
            Atrule,
            Rule,
            Block
        },
        Rule: {
            StyleSheet,
            Atrule,
            Rule,
            Block
        },
        Declaration: {
            StyleSheet,
            Atrule,
            Rule,
            Block,
            DeclarationList
        }
    };
}

function createWalker(config) {
    const types = getTypesFromConfig(config);
    const iteratorsNatural = {};
    const iteratorsReverse = {};
    const breakWalk = Symbol('break-walk');
    const skipNode = Symbol('skip-node');

    for (const name in types) {
        if (hasOwnProperty.call(types, name) && types[name] !== null) {
            iteratorsNatural[name] = createTypeIterator(types[name], false);
            iteratorsReverse[name] = createTypeIterator(types[name], true);
        }
    }

    const fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
    const fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);

    const walk = function(root, options) {
        function walkNode(node, item, list) {
            const enterRet = enter.call(context, node, item, list);

            if (enterRet === breakWalk) {
                return true;
            }

            if (enterRet === skipNode) {
                return false;
            }

            if (iterators.hasOwnProperty(node.type)) {
                if (iterators[node.type](node, context, walkNode, walkReducer)) {
                    return true;
                }
            }

            if (leave.call(context, node, item, list) === breakWalk) {
                return true;
            }

            return false;
        }

        let enter = noop;
        let leave = noop;
        let iterators = iteratorsNatural;
        let walkReducer = (ret, data, item, list) => ret || walkNode(data, item, list);
        const context = {
            break: breakWalk,
            skip: skipNode,

            root,
            stylesheet: null,
            atrule: null,
            atrulePrelude: null,
            rule: null,
            selector: null,
            block: null,
            declaration: null,
            function: null
        };

        if (typeof options === 'function') {
            enter = options;
        } else if (options) {
            enter = ensureFunction(options.enter);
            leave = ensureFunction(options.leave);

            if (options.reverse) {
                iterators = iteratorsReverse;
            }

            if (options.visit) {
                if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) {
                    iterators = options.reverse
                        ? fastTraversalIteratorsReverse[options.visit]
                        : fastTraversalIteratorsNatural[options.visit];
                } else if (!types.hasOwnProperty(options.visit)) {
                    throw new Error('Bad value `' + options.visit + '` for `visit` option (should be: ' + Object.keys(types).sort().join(', ') + ')');
                }

                enter = invokeForType(enter, options.visit);
                leave = invokeForType(leave, options.visit);
            }
        }

        if (enter === noop && leave === noop) {
            throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
        }

        walkNode(root);
    };

    walk.break = breakWalk;
    walk.skip = skipNode;

    walk.find = function(ast, fn) {
        let found = null;

        walk(ast, function(node, item, list) {
            if (fn.call(this, node, item, list)) {
                found = node;
                return breakWalk;
            }
        });

        return found;
    };

    walk.findLast = function(ast, fn) {
        let found = null;

        walk(ast, {
            reverse: true,
            enter: function(node, item, list) {
                if (fn.call(this, node, item, list)) {
                    found = node;
                    return breakWalk;
                }
            }
        });

        return found;
    };

    walk.findAll = function(ast, fn) {
        const found = [];

        walk(ast, function(node, item, list) {
            if (fn.call(this, node, item, list)) {
                found.push(node);
            }
        });

        return found;
    };

    return walk;
}

exports.createWalker = createWalker;


/***/ }),

/***/ 5911:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const utils = __webpack_require__(7471);

function cleanAtrule(node, item, list) {
    if (node.block) {
        // otherwise removed at-rule don't prevent @import for removal
        if (this.stylesheet !== null) {
            this.stylesheet.firstAtrulesAllowed = false;
        }

        if (utils.hasNoChildren(node.block)) {
            list.remove(item);
            return;
        }
    }

    switch (node.name) {
        case 'charset':
            if (utils.hasNoChildren(node.prelude)) {
                list.remove(item);
                return;
            }

            // if there is any rule before @charset -> remove it
            if (item.prev) {
                list.remove(item);
                return;
            }

            break;

        case 'import':
            if (this.stylesheet === null || !this.stylesheet.firstAtrulesAllowed) {
                list.remove(item);
                return;
            }

            // if there are some rules that not an @import or @charset before @import
            // remove it
            list.prevUntil(item.prev, function(rule) {
                if (rule.type === 'Atrule') {
                    if (rule.name === 'import' || rule.name === 'charset') {
                        return;
                    }
                }

                this.root.firstAtrulesAllowed = false;
                list.remove(item);

                return true;
            }, this);

            break;

        default: {
            const name = cssTree.keyword(node.name).basename;

            if (name === 'keyframes' ||
                name === 'media' ||
                name === 'supports') {

                // drop at-rule with no prelude
                if (utils.hasNoChildren(node.prelude) || utils.hasNoChildren(node.block)) {
                    list.remove(item);
                }
            }
        }
    }
}

module.exports = cleanAtrule;


/***/ }),

/***/ 1577:
/***/ ((module) => {

"use strict";


function cleanComment(data, item, list) {
    list.remove(item);
}

module.exports = cleanComment;


/***/ }),

/***/ 4225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);

function cleanDeclartion(node, item, list) {
    if (node.value.children && node.value.children.isEmpty) {
        list.remove(item);
        return;
    }

    if (cssTree.property(node.property).custom) {
        if (/\S/.test(node.value.value)) {
            node.value.value = node.value.value.trim();
        }
    }
}

module.exports = cleanDeclartion;


/***/ }),

/***/ 7350:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const utils = __webpack_require__(7471);

function cleanRaw(node, item, list) {
    // raw in stylesheet or block children
    if (utils.isNodeChildrenList(this.stylesheet, list) ||
        utils.isNodeChildrenList(this.block, list)) {
        list.remove(item);
    }
}

module.exports = cleanRaw;


/***/ }),

/***/ 3437:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const utils = __webpack_require__(7471);

const { hasOwnProperty } = Object.prototype;

function cleanUnused(selectorList, usageData) {
    selectorList.children.forEach((selector, item, list) => {
        let shouldRemove = false;

        cssTree.walk(selector, function(node) {
            // ignore nodes in nested selectors
            if (this.selector === null || this.selector === selectorList) {
                switch (node.type) {
                    case 'SelectorList':
                        // TODO: remove toLowerCase when pseudo selectors will be normalized
                        // ignore selectors inside :not()
                        if (this.function === null || this.function.name.toLowerCase() !== 'not') {
                            if (cleanUnused(node, usageData)) {
                                shouldRemove = true;
                            }
                        }
                        break;

                    case 'ClassSelector':
                        if (usageData.whitelist !== null &&
                            usageData.whitelist.classes !== null &&
                            !hasOwnProperty.call(usageData.whitelist.classes, node.name)) {
                            shouldRemove = true;
                        }
                        if (usageData.blacklist !== null &&
                            usageData.blacklist.classes !== null &&
                            hasOwnProperty.call(usageData.blacklist.classes, node.name)) {
                            shouldRemove = true;
                        }
                        break;

                    case 'IdSelector':
                        if (usageData.whitelist !== null &&
                            usageData.whitelist.ids !== null &&
                            !hasOwnProperty.call(usageData.whitelist.ids, node.name)) {
                            shouldRemove = true;
                        }
                        if (usageData.blacklist !== null &&
                            usageData.blacklist.ids !== null &&
                            hasOwnProperty.call(usageData.blacklist.ids, node.name)) {
                            shouldRemove = true;
                        }
                        break;

                    case 'TypeSelector':
                        // TODO: remove toLowerCase when type selectors will be normalized
                        // ignore universal selectors
                        if (node.name.charAt(node.name.length - 1) !== '*') {
                            if (usageData.whitelist !== null &&
                                usageData.whitelist.tags !== null &&
                                !hasOwnProperty.call(usageData.whitelist.tags, node.name.toLowerCase())) {
                                shouldRemove = true;
                            }
                            if (usageData.blacklist !== null &&
                                usageData.blacklist.tags !== null &&
                                hasOwnProperty.call(usageData.blacklist.tags, node.name.toLowerCase())) {
                                shouldRemove = true;
                            }
                        }
                        break;
                }
            }
        });

        if (shouldRemove) {
            list.remove(item);
        }
    });

    return selectorList.children.isEmpty;
}

function cleanRule(node, item, list, options) {
    if (utils.hasNoChildren(node.prelude) || utils.hasNoChildren(node.block)) {
        list.remove(item);
        return;
    }

    const { usage } = options;

    if (usage && (usage.whitelist !== null || usage.blacklist !== null)) {
        cleanUnused(node.prelude, usage);

        if (utils.hasNoChildren(node.prelude)) {
            list.remove(item);
            return;
        }
    }
}

module.exports = cleanRule;


/***/ }),

/***/ 4083:
/***/ ((module) => {

"use strict";


// remove useless universal selector
function cleanTypeSelector(node, item, list) {
    const name = item.data.name;

    // check it's a non-namespaced universal selector
    if (name !== '*') {
        return;
    }

    // remove when universal selector before other selectors
    const nextType = item.next && item.next.data.type;
    if (nextType === 'IdSelector' ||
        nextType === 'ClassSelector' ||
        nextType === 'AttributeSelector' ||
        nextType === 'PseudoClassSelector' ||
        nextType === 'PseudoElementSelector') {
        list.remove(item);
    }
}

module.exports = cleanTypeSelector;


/***/ }),

/***/ 4535:
/***/ ((module) => {

"use strict";


function cleanWhitespace(node, item, list) {
    list.remove(item);
}

module.exports = cleanWhitespace;


/***/ }),

/***/ 2955:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const Atrule = __webpack_require__(5911);
const Comment = __webpack_require__(1577);
const Declaration = __webpack_require__(4225);
const Raw = __webpack_require__(7350);
const Rule = __webpack_require__(3437);
const TypeSelector = __webpack_require__(4083);
const WhiteSpace = __webpack_require__(4535);

const handlers = {
    Atrule,
    Comment,
    Declaration,
    Raw,
    Rule,
    TypeSelector,
    WhiteSpace
};

function clean(ast, options) {
    cssTree.walk(ast, {
        leave(node, item, list) {
            if (handlers.hasOwnProperty(node.type)) {
                handlers[node.type].call(this, node, item, list, options);
            }
        }
    });
}

module.exports = clean;


/***/ }),

/***/ 7471:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function hasNoChildren(node) {
    return !node || !node.children || node.children.isEmpty;
}

function isNodeChildrenList(node, list) {
    return node !== null && node.children === list;
}

exports.hasNoChildren = hasNoChildren;
exports.isNodeChildrenList = isNodeChildrenList;


/***/ }),

/***/ 8039:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const usage = __webpack_require__(8748);
const index = __webpack_require__(2955);
const index$1 = __webpack_require__(5322);
const index$2 = __webpack_require__(1883);

function readChunk(input, specialComments) {
    const children = new cssTree.List();
    let nonSpaceTokenInBuffer = false;
    let protectedComment;

    input.nextUntil(input.head, (node, item, list) => {
        if (node.type === 'Comment') {
            if (!specialComments || node.value.charAt(0) !== '!') {
                list.remove(item);
                return;
            }

            if (nonSpaceTokenInBuffer || protectedComment) {
                return true;
            }

            list.remove(item);
            protectedComment = node;

            return;
        }

        if (node.type !== 'WhiteSpace') {
            nonSpaceTokenInBuffer = true;
        }

        children.insert(list.remove(item));
    });

    return {
        comment: protectedComment,
        stylesheet: {
            type: 'StyleSheet',
            loc: null,
            children
        }
    };
}

function compressChunk(ast, firstAtrulesAllowed, num, options) {
    options.logger(`Compress block #${num}`, null, true);

    let seed = 1;

    if (ast.type === 'StyleSheet') {
        ast.firstAtrulesAllowed = firstAtrulesAllowed;
        ast.id = seed++;
    }

    cssTree.walk(ast, {
        visit: 'Atrule',
        enter(node) {
            if (node.block !== null) {
                node.block.id = seed++;
            }
        }
    });
    options.logger('init', ast);

    // remove redundant
    index(ast, options);
    options.logger('clean', ast);

    // replace nodes for shortened forms
    index$1(ast);
    options.logger('replace', ast);

    // structure optimisations
    if (options.restructuring) {
        index$2(ast, options);
    }

    return ast;
}

function getCommentsOption(options) {
    let comments = 'comments' in options ? options.comments : 'exclamation';

    if (typeof comments === 'boolean') {
        comments = comments ? 'exclamation' : false;
    } else if (comments !== 'exclamation' && comments !== 'first-exclamation') {
        comments = false;
    }

    return comments;
}

function getRestructureOption(options) {
    if ('restructure' in options) {
        return options.restructure;
    }

    return 'restructuring' in options ? options.restructuring : true;
}

function wrapBlock(block) {
    return new cssTree.List().appendData({
        type: 'Rule',
        loc: null,
        prelude: {
            type: 'SelectorList',
            loc: null,
            children: new cssTree.List().appendData({
                type: 'Selector',
                loc: null,
                children: new cssTree.List().appendData({
                    type: 'TypeSelector',
                    loc: null,
                    name: 'x'
                })
            })
        },
        block
    });
}

function compress(ast, options) {
    ast = ast || { type: 'StyleSheet', loc: null, children: new cssTree.List() };
    options = options || {};

    const compressOptions = {
        logger: typeof options.logger === 'function' ? options.logger : function() {},
        restructuring: getRestructureOption(options),
        forceMediaMerge: Boolean(options.forceMediaMerge),
        usage: options.usage ? usage.buildIndex(options.usage) : false
    };
    const output = new cssTree.List();
    let specialComments = getCommentsOption(options);
    let firstAtrulesAllowed = true;
    let input;
    let chunk;
    let chunkNum = 1;
    let chunkChildren;

    if (options.clone) {
        ast = cssTree.clone(ast);
    }

    if (ast.type === 'StyleSheet') {
        input = ast.children;
        ast.children = output;
    } else {
        input = wrapBlock(ast);
    }

    do {
        chunk = readChunk(input, Boolean(specialComments));
        compressChunk(chunk.stylesheet, firstAtrulesAllowed, chunkNum++, compressOptions);
        chunkChildren = chunk.stylesheet.children;

        if (chunk.comment) {
            // add \n before comment if there is another content in output
            if (!output.isEmpty) {
                output.insert(cssTree.List.createItem({
                    type: 'Raw',
                    value: '\n'
                }));
            }

            output.insert(cssTree.List.createItem(chunk.comment));

            // add \n after comment if chunk is not empty
            if (!chunkChildren.isEmpty) {
                output.insert(cssTree.List.createItem({
                    type: 'Raw',
                    value: '\n'
                }));
            }
        }

        if (firstAtrulesAllowed && !chunkChildren.isEmpty) {
            const lastRule = chunkChildren.last;

            if (lastRule.type !== 'Atrule' ||
               (lastRule.name !== 'import' && lastRule.name !== 'charset')) {
                firstAtrulesAllowed = false;
            }
        }

        if (specialComments !== 'exclamation') {
            specialComments = false;
        }

        output.appendList(chunkChildren);
    } while (!input.isEmpty);

    return {
        ast
    };
}

module.exports = compress;


/***/ }),

/***/ 1830:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const version = __webpack_require__(2875);
const syntax = __webpack_require__(4061);
const utils = __webpack_require__(3460);

const { parse, generate, compress } = syntax;

function debugOutput(name, options, startTime, data) {
    if (options.debug) {
        console.error(`## ${name} done in %d ms\n`, Date.now() - startTime);
    }

    return data;
}

function createDefaultLogger(level) {
    let lastDebug;

    return function logger(title, ast) {
        let line = title;

        if (ast) {
            line = `[${((Date.now() - lastDebug) / 1000).toFixed(3)}s] ${line}`;
        }

        if (level > 1 && ast) {
            let css = generate(ast);

            // when level 2, limit css to 256 symbols
            if (level === 2 && css.length > 256) {
                css = css.substr(0, 256) + '...';
            }

            line += `\n  ${css}\n`;
        }

        console.error(line);
        lastDebug = Date.now();
    };
}

function buildCompressOptions(options) {
    options = { ...options };

    if (typeof options.logger !== 'function' && options.debug) {
        options.logger = createDefaultLogger(options.debug);
    }

    return options;
}

function runHandler(ast, options, handlers) {
    if (!Array.isArray(handlers)) {
        handlers = [handlers];
    }

    handlers.forEach(fn => fn(ast, options));
}

function minify(context, source, options) {
    options = options || {};

    const filename = options.filename || '<unknown>';
    let result;

    // parse
    const ast = debugOutput('parsing', options, Date.now(),
        parse(source, {
            context,
            filename,
            positions: Boolean(options.sourceMap)
        })
    );

    // before compress handlers
    if (options.beforeCompress) {
        debugOutput('beforeCompress', options, Date.now(),
            runHandler(ast, options, options.beforeCompress)
        );
    }

    // compress
    const compressResult = debugOutput('compress', options, Date.now(),
        compress(ast, buildCompressOptions(options))
    );

    // after compress handlers
    if (options.afterCompress) {
        debugOutput('afterCompress', options, Date.now(),
            runHandler(compressResult, options, options.afterCompress)
        );
    }

    // generate
    if (options.sourceMap) {
        result = debugOutput('generate(sourceMap: true)', options, Date.now(), (() => {
            const tmp = generate(compressResult.ast, { sourceMap: true });

            tmp.map._file = filename; // since other tools can relay on file in source map transform chain
            tmp.map.setSourceContent(filename, source);

            return tmp;
        })());
    } else {
        result = debugOutput('generate', options, Date.now(), {
            css: generate(compressResult.ast),
            map: null
        });
    }

    return result;
}

function minifyStylesheet(source, options) {
    return minify('stylesheet', source, options);
}

function minifyBlock(source, options) {
    return minify('declarationList', source, options);
}

exports.version = version.version;
exports.syntax = syntax;
exports.utils = utils;
exports.minify = minifyStylesheet;
exports.minifyBlock = minifyBlock;


/***/ }),

/***/ 8124:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const keyframes = __webpack_require__(1155);

function Atrule(node) {
    // compress @keyframe selectors
    if (cssTree.keyword(node.name).basename === 'keyframes') {
        keyframes(node);
    }
}

module.exports = Atrule;


/***/ }),

/***/ 2500:
/***/ ((module) => {

"use strict";


// Can unquote attribute detection
// Adopted implementation of Mathias Bynens
// https://github.com/mathiasbynens/mothereff.in/blob/master/unquoted-attributes/eff.js
const blockUnquoteRx = /^(-?\d|--)|[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/;

function canUnquote(value) {
    if (value === '' || value === '-') {
        return false;
    }

    return !blockUnquoteRx.test(value);
}

function AttributeSelector(node) {
    const attrValue = node.value;

    if (!attrValue || attrValue.type !== 'String') {
        return;
    }

    if (canUnquote(attrValue.value)) {
        node.value = {
            type: 'Identifier',
            loc: attrValue.loc,
            name: attrValue.value
        };
    }
}

module.exports = AttributeSelector;


/***/ }),

/***/ 7782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const _Number = __webpack_require__(2733);

const MATH_FUNCTIONS = new Set([
    'calc',
    'min',
    'max',
    'clamp'
]);
const LENGTH_UNIT = new Set([
    // absolute length units
    'px',
    'mm',
    'cm',
    'in',
    'pt',
    'pc',

    // relative length units
    'em',
    'ex',
    'ch',
    'rem',

    // viewport-percentage lengths
    'vh',
    'vw',
    'vmin',
    'vmax',
    'vm'
]);

function compressDimension(node, item) {
    const value = _Number.packNumber(node.value);

    node.value = value;

    if (value === '0' && this.declaration !== null && this.atrulePrelude === null) {
        const unit = node.unit.toLowerCase();

        // only length values can be compressed
        if (!LENGTH_UNIT.has(unit)) {
            return;
        }

        // issue #362: shouldn't remove unit in -ms-flex since it breaks flex in IE10/11
        // issue #200: shouldn't remove unit in flex since it breaks flex in IE10/11
        if (this.declaration.property === '-ms-flex' ||
            this.declaration.property === 'flex') {
            return;
        }

        // issue #222: don't remove units inside calc
        if (this.function && MATH_FUNCTIONS.has(this.function.name)) {
            return;
        }

        item.data = {
            type: 'Number',
            loc: node.loc,
            value
        };
    }
}

module.exports = compressDimension;


/***/ }),

/***/ 2733:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const OMIT_PLUSSIGN = /^(?:\+|(-))?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/;
const KEEP_PLUSSIGN = /^([\+\-])?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/;
const unsafeToRemovePlusSignAfter = new Set([
    'Dimension',
    'Hash',
    'Identifier',
    'Number',
    'Raw',
    'UnicodeRange'
]);

function packNumber(value, item) {
    // omit plus sign only if no prev or prev is safe type
    const regexp = item && item.prev !== null && unsafeToRemovePlusSignAfter.has(item.prev.data.type)
        ? KEEP_PLUSSIGN
        : OMIT_PLUSSIGN;

    // 100 -> '100'
    // 00100 -> '100'
    // +100 -> '100'
    // -100 -> '-100'
    // 0.123 -> '.123'
    // 0.12300 -> '.123'
    // 0.0 -> ''
    // 0 -> ''
    // -0 -> '-'
    value = String(value).replace(regexp, '$1$2$3');

    if (value === '' || value === '-') {
        value = '0';
    }
    // FIXME: is it solution simplier?
    // value = String(Number(value)).replace(/^(-?)0+\./, '$1.');

    return value;
}

function Number(node) {
    node.value = packNumber(node.value);
}

exports.Number = Number;
exports.packNumber = packNumber;


/***/ }),

/***/ 2344:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const _Number = __webpack_require__(2733);

const blacklist = new Set([
    // see https://github.com/jakubpawlowicz/clean-css/issues/957
    'width',
    'min-width',
    'max-width',
    'height',
    'min-height',
    'max-height',

    // issue #410: Don’t remove units in flex-basis value for (-ms-)flex shorthand
    // issue #362: shouldn't remove unit in -ms-flex since it breaks flex in IE10/11
    // issue #200: shouldn't remove unit in flex since it breaks flex in IE10/11
    'flex',
    '-ms-flex'
]);

function compressPercentage(node, item) {
    node.value = _Number.packNumber(node.value);

    if (node.value === '0' && this.declaration && !blacklist.has(this.declaration.property)) {
        // try to convert a number
        item.data = {
            type: 'Number',
            loc: node.loc,
            value: node.value
        };

        // that's ok only when new value matches on length
        if (!cssTree.lexer.matchDeclaration(this.declaration).isType(item.data, 'length')) {
            // otherwise rollback changes
            item.data = node;
        }
    }
}

module.exports = compressPercentage;


/***/ }),

/***/ 8009:
/***/ ((module) => {

"use strict";


function Url(node) {
    // convert `\\` to `/`
    node.value = node.value.replace(/\\/g, '/');
}

module.exports = Url;


/***/ }),

/***/ 4924:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const font = __webpack_require__(5465);
const fontWeight = __webpack_require__(3240);
const background = __webpack_require__(5341);
const border = __webpack_require__(9986);

const handlers = {
    'font': font,
    'font-weight': fontWeight,
    'background': background,
    'border': border,
    'outline': border
};

function compressValue(node) {
    if (!this.declaration) {
        return;
    }

    const property = cssTree.property(this.declaration.property);

    if (handlers.hasOwnProperty(property.basename)) {
        handlers[property.basename](node);
    }
}

module.exports = compressValue;


/***/ }),

/***/ 1155:
/***/ ((module) => {

"use strict";


function compressKeyframes(node) {
    node.block.children.forEach((rule) => {
        rule.prelude.children.forEach((simpleselector) => {
            simpleselector.children.forEach((data, item) => {
                if (data.type === 'Percentage' && data.value === '100') {
                    item.data = {
                        type: 'TypeSelector',
                        loc: data.loc,
                        name: 'to'
                    };
                } else if (data.type === 'TypeSelector' && data.name === 'from') {
                    item.data = {
                        type: 'Percentage',
                        loc: data.loc,
                        value: '0'
                    };
                }
            });
        });
    });
}

module.exports = compressKeyframes;


/***/ }),

/***/ 8292:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const _Number = __webpack_require__(2733);

// http://www.w3.org/TR/css3-color/#svg-color
const NAME_TO_HEX = {
    'aliceblue': 'f0f8ff',
    'antiquewhite': 'faebd7',
    'aqua': '0ff',
    'aquamarine': '7fffd4',
    'azure': 'f0ffff',
    'beige': 'f5f5dc',
    'bisque': 'ffe4c4',
    'black': '000',
    'blanchedalmond': 'ffebcd',
    'blue': '00f',
    'blueviolet': '8a2be2',
    'brown': 'a52a2a',
    'burlywood': 'deb887',
    'cadetblue': '5f9ea0',
    'chartreuse': '7fff00',
    'chocolate': 'd2691e',
    'coral': 'ff7f50',
    'cornflowerblue': '6495ed',
    'cornsilk': 'fff8dc',
    'crimson': 'dc143c',
    'cyan': '0ff',
    'darkblue': '00008b',
    'darkcyan': '008b8b',
    'darkgoldenrod': 'b8860b',
    'darkgray': 'a9a9a9',
    'darkgrey': 'a9a9a9',
    'darkgreen': '006400',
    'darkkhaki': 'bdb76b',
    'darkmagenta': '8b008b',
    'darkolivegreen': '556b2f',
    'darkorange': 'ff8c00',
    'darkorchid': '9932cc',
    'darkred': '8b0000',
    'darksalmon': 'e9967a',
    'darkseagreen': '8fbc8f',
    'darkslateblue': '483d8b',
    'darkslategray': '2f4f4f',
    'darkslategrey': '2f4f4f',
    'darkturquoise': '00ced1',
    'darkviolet': '9400d3',
    'deeppink': 'ff1493',
    'deepskyblue': '00bfff',
    'dimgray': '696969',
    'dimgrey': '696969',
    'dodgerblue': '1e90ff',
    'firebrick': 'b22222',
    'floralwhite': 'fffaf0',
    'forestgreen': '228b22',
    'fuchsia': 'f0f',
    'gainsboro': 'dcdcdc',
    'ghostwhite': 'f8f8ff',
    'gold': 'ffd700',
    'goldenrod': 'daa520',
    'gray': '808080',
    'grey': '808080',
    'green': '008000',
    'greenyellow': 'adff2f',
    'honeydew': 'f0fff0',
    'hotpink': 'ff69b4',
    'indianred': 'cd5c5c',
    'indigo': '4b0082',
    'ivory': 'fffff0',
    'khaki': 'f0e68c',
    'lavender': 'e6e6fa',
    'lavenderblush': 'fff0f5',
    'lawngreen': '7cfc00',
    'lemonchiffon': 'fffacd',
    'lightblue': 'add8e6',
    'lightcoral': 'f08080',
    'lightcyan': 'e0ffff',
    'lightgoldenrodyellow': 'fafad2',
    'lightgray': 'd3d3d3',
    'lightgrey': 'd3d3d3',
    'lightgreen': '90ee90',
    'lightpink': 'ffb6c1',
    'lightsalmon': 'ffa07a',
    'lightseagreen': '20b2aa',
    'lightskyblue': '87cefa',
    'lightslategray': '789',
    'lightslategrey': '789',
    'lightsteelblue': 'b0c4de',
    'lightyellow': 'ffffe0',
    'lime': '0f0',
    'limegreen': '32cd32',
    'linen': 'faf0e6',
    'magenta': 'f0f',
    'maroon': '800000',
    'mediumaquamarine': '66cdaa',
    'mediumblue': '0000cd',
    'mediumorchid': 'ba55d3',
    'mediumpurple': '9370db',
    'mediumseagreen': '3cb371',
    'mediumslateblue': '7b68ee',
    'mediumspringgreen': '00fa9a',
    'mediumturquoise': '48d1cc',
    'mediumvioletred': 'c71585',
    'midnightblue': '191970',
    'mintcream': 'f5fffa',
    'mistyrose': 'ffe4e1',
    'moccasin': 'ffe4b5',
    'navajowhite': 'ffdead',
    'navy': '000080',
    'oldlace': 'fdf5e6',
    'olive': '808000',
    'olivedrab': '6b8e23',
    'orange': 'ffa500',
    'orangered': 'ff4500',
    'orchid': 'da70d6',
    'palegoldenrod': 'eee8aa',
    'palegreen': '98fb98',
    'paleturquoise': 'afeeee',
    'palevioletred': 'db7093',
    'papayawhip': 'ffefd5',
    'peachpuff': 'ffdab9',
    'peru': 'cd853f',
    'pink': 'ffc0cb',
    'plum': 'dda0dd',
    'powderblue': 'b0e0e6',
    'purple': '800080',
    'rebeccapurple': '639',
    'red': 'f00',
    'rosybrown': 'bc8f8f',
    'royalblue': '4169e1',
    'saddlebrown': '8b4513',
    'salmon': 'fa8072',
    'sandybrown': 'f4a460',
    'seagreen': '2e8b57',
    'seashell': 'fff5ee',
    'sienna': 'a0522d',
    'silver': 'c0c0c0',
    'skyblue': '87ceeb',
    'slateblue': '6a5acd',
    'slategray': '708090',
    'slategrey': '708090',
    'snow': 'fffafa',
    'springgreen': '00ff7f',
    'steelblue': '4682b4',
    'tan': 'd2b48c',
    'teal': '008080',
    'thistle': 'd8bfd8',
    'tomato': 'ff6347',
    'turquoise': '40e0d0',
    'violet': 'ee82ee',
    'wheat': 'f5deb3',
    'white': 'fff',
    'whitesmoke': 'f5f5f5',
    'yellow': 'ff0',
    'yellowgreen': '9acd32'
};

const HEX_TO_NAME = {
    '800000': 'maroon',
    '800080': 'purple',
    '808000': 'olive',
    '808080': 'gray',
    '00ffff': 'cyan',
    'f0ffff': 'azure',
    'f5f5dc': 'beige',
    'ffe4c4': 'bisque',
    '000000': 'black',
    '0000ff': 'blue',
    'a52a2a': 'brown',
    'ff7f50': 'coral',
    'ffd700': 'gold',
    '008000': 'green',
    '4b0082': 'indigo',
    'fffff0': 'ivory',
    'f0e68c': 'khaki',
    '00ff00': 'lime',
    'faf0e6': 'linen',
    '000080': 'navy',
    'ffa500': 'orange',
    'da70d6': 'orchid',
    'cd853f': 'peru',
    'ffc0cb': 'pink',
    'dda0dd': 'plum',
    'f00': 'red',
    'ff0000': 'red',
    'fa8072': 'salmon',
    'a0522d': 'sienna',
    'c0c0c0': 'silver',
    'fffafa': 'snow',
    'd2b48c': 'tan',
    '008080': 'teal',
    'ff6347': 'tomato',
    'ee82ee': 'violet',
    'f5deb3': 'wheat',
    'ffffff': 'white',
    'ffff00': 'yellow'
};

function hueToRgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}

function hslToRgb(h, s, l, a) {
    let r;
    let g;
    let b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        a
    ];
}

function toHex(value) {
    value = value.toString(16);

    return value.length === 1 ? '0' + value : value;
}

function parseFunctionArgs(functionArgs, count, rgb) {
    let cursor = functionArgs.head;
    let args = [];
    let wasValue = false;

    while (cursor !== null) {
        const { type, value } = cursor.data;

        switch (type) {
            case 'Number':
            case 'Percentage':
                if (wasValue) {
                    return;
                }

                wasValue = true;
                args.push({
                    type,
                    value: Number(value)
                });

                break;

            case 'Operator':
                if (value === ',') {
                    if (!wasValue) {
                        return;
                    }
                    wasValue = false;
                } else if (wasValue || value !== '+') {
                    return;
                }

                break;

            default:
                // something we couldn't understand
                return;
        }

        cursor = cursor.next;
    }

    if (args.length !== count) {
        // invalid arguments count
        // TODO: remove those tokens
        return;
    }

    if (args.length === 4) {
        if (args[3].type !== 'Number') {
            // 4th argument should be a number
            // TODO: remove those tokens
            return;
        }

        args[3].type = 'Alpha';
    }

    if (rgb) {
        if (args[0].type !== args[1].type || args[0].type !== args[2].type) {
            // invalid color, numbers and percentage shouldn't be mixed
            // TODO: remove those tokens
            return;
        }
    } else {
        if (args[0].type !== 'Number' ||
            args[1].type !== 'Percentage' ||
            args[2].type !== 'Percentage') {
            // invalid color, for hsl values should be: number, percentage, percentage
            // TODO: remove those tokens
            return;
        }

        args[0].type = 'Angle';
    }

    return args.map(function(arg) {
        let value = Math.max(0, arg.value);

        switch (arg.type) {
            case 'Number':
                // fit value to [0..255] range
                value = Math.min(value, 255);
                break;

            case 'Percentage':
                // convert 0..100% to value in [0..255] range
                value = Math.min(value, 100) / 100;

                if (!rgb) {
                    return value;
                }

                value = 255 * value;
                break;

            case 'Angle':
                // fit value to (-360..360) range
                return (((value % 360) + 360) % 360) / 360;

            case 'Alpha':
                // fit value to [0..1] range
                return Math.min(value, 1);
        }

        return Math.round(value);
    });
}

function compressFunction(node, item) {
    let functionName = node.name;
    let args;

    if (functionName === 'rgba' || functionName === 'hsla') {
        args = parseFunctionArgs(node.children, 4, functionName === 'rgba');

        if (!args) {
            // something went wrong
            return;
        }

        if (functionName === 'hsla') {
            args = hslToRgb(...args);
            node.name = 'rgba';
        }

        if (args[3] === 0) {
            // try to replace `rgba(x, x, x, 0)` to `transparent`
            // always replace `rgba(0, 0, 0, 0)` to `transparent`
            // otherwise avoid replacement in gradients since it may break color transition
            // http://stackoverflow.com/questions/11829410/css3-gradient-rendering-issues-from-transparent-to-white
            const scopeFunctionName = this.function && this.function.name;

            if ((args[0] === 0 && args[1] === 0 && args[2] === 0) ||
                !/^(?:to|from|color-stop)$|gradient$/i.test(scopeFunctionName)) {

                item.data = {
                    type: 'Identifier',
                    loc: node.loc,
                    name: 'transparent'
                };

                return;
            }
        }

        if (args[3] !== 1) {
            // replace argument values for normalized/interpolated
            node.children.forEach((node, item, list) => {
                if (node.type === 'Operator') {
                    if (node.value !== ',') {
                        list.remove(item);
                    }
                    return;
                }

                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: _Number.packNumber(args.shift())
                };
            });

            return;
        }

        // otherwise convert to rgb, i.e. rgba(255, 0, 0, 1) -> rgb(255, 0, 0)
        functionName = 'rgb';
    }

    if (functionName === 'hsl') {
        args = args || parseFunctionArgs(node.children, 3, false);

        if (!args) {
            // something went wrong
            return;
        }

        // convert to rgb
        args = hslToRgb(...args);
        functionName = 'rgb';
    }

    if (functionName === 'rgb') {
        args = args || parseFunctionArgs(node.children, 3, true);

        if (!args) {
            // something went wrong
            return;
        }

        item.data = {
            type: 'Hash',
            loc: node.loc,
            value: toHex(args[0]) + toHex(args[1]) + toHex(args[2])
        };

        compressHex(item.data, item);
    }
}

function compressIdent(node, item) {
    if (this.declaration === null) {
        return;
    }

    let color = node.name.toLowerCase();

    if (NAME_TO_HEX.hasOwnProperty(color) &&
        cssTree.lexer.matchDeclaration(this.declaration).isType(node, 'color')) {
        const hex = NAME_TO_HEX[color];

        if (hex.length + 1 <= color.length) {
            // replace for shorter hex value
            item.data = {
                type: 'Hash',
                loc: node.loc,
                value: hex
            };
        } else {
            // special case for consistent colors
            if (color === 'grey') {
                color = 'gray';
            }

            // just replace value for lower cased name
            node.name = color;
        }
    }
}

function compressHex(node, item) {
    let color = node.value.toLowerCase();

    // #112233 -> #123
    if (color.length === 6 &&
        color[0] === color[1] &&
        color[2] === color[3] &&
        color[4] === color[5]) {
        color = color[0] + color[2] + color[4];
    }

    if (HEX_TO_NAME[color]) {
        item.data = {
            type: 'Identifier',
            loc: node.loc,
            name: HEX_TO_NAME[color]
        };
    } else {
        node.value = color;
    }
}

exports.compressFunction = compressFunction;
exports.compressHex = compressHex;
exports.compressIdent = compressIdent;


/***/ }),

/***/ 5322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const Atrule = __webpack_require__(8124);
const AttributeSelector = __webpack_require__(2500);
const Value = __webpack_require__(4924);
const Dimension = __webpack_require__(7782);
const Percentage = __webpack_require__(2344);
const _Number = __webpack_require__(2733);
const Url = __webpack_require__(8009);
const color = __webpack_require__(8292);

const handlers = {
    Atrule,
    AttributeSelector,
    Value,
    Dimension,
    Percentage,
    Number: _Number.Number,
    Url,
    Hash: color.compressHex,
    Identifier: color.compressIdent,
    Function: color.compressFunction
};

function replace(ast) {
    cssTree.walk(ast, {
        leave(node, item, list) {
            if (handlers.hasOwnProperty(node.type)) {
                handlers[node.type].call(this, node, item, list);
            }
        }
    });
}

module.exports = replace;


/***/ }),

/***/ 5341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);

function compressBackground(node) {
    function flush() {
        if (!buffer.length) {
            buffer.unshift(
                {
                    type: 'Number',
                    loc: null,
                    value: '0'
                },
                {
                    type: 'Number',
                    loc: null,
                    value: '0'
                }
            );
        }

        newValue.push.apply(newValue, buffer);

        buffer = [];
    }

    let newValue = [];
    let buffer = [];

    node.children.forEach((node) => {
        if (node.type === 'Operator' && node.value === ',') {
            flush();
            newValue.push(node);
            return;
        }

        // remove defaults
        if (node.type === 'Identifier') {
            if (node.name === 'transparent' ||
                node.name === 'none' ||
                node.name === 'repeat' ||
                node.name === 'scroll') {
                return;
            }
        }

        buffer.push(node);
    });

    flush();
    node.children = new cssTree.List().fromArray(newValue);
}

module.exports = compressBackground;


/***/ }),

/***/ 9986:
/***/ ((module) => {

"use strict";


function compressBorder(node) {
    node.children.forEach((node, item, list) => {
        if (node.type === 'Identifier' && node.name.toLowerCase() === 'none') {
            if (list.head === list.tail) {
                // replace `none` for zero when `none` is a single term
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '0'
                };
            } else {
                list.remove(item);
            }
        }
    });
}

module.exports = compressBorder;


/***/ }),

/***/ 3240:
/***/ ((module) => {

"use strict";


function compressFontWeight(node) {
    const value = node.children.head.data;

    if (value.type === 'Identifier') {
        switch (value.name) {
            case 'normal':
                node.children.head.data = {
                    type: 'Number',
                    loc: value.loc,
                    value: '400'
                };
                break;
            case 'bold':
                node.children.head.data = {
                    type: 'Number',
                    loc: value.loc,
                    value: '700'
                };
                break;
        }
    }
}

module.exports = compressFontWeight;


/***/ }),

/***/ 5465:
/***/ ((module) => {

"use strict";


function compressFont(node) {
    const list = node.children;

    list.forEachRight(function(node, item) {
        if (node.type === 'Identifier') {
            if (node.name === 'bold') {
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '700'
                };
            } else if (node.name === 'normal') {
                const prev = item.prev;

                if (prev && prev.data.type === 'Operator' && prev.data.value === '/') {
                    this.remove(prev);
                }

                this.remove(item);
            } else if (node.name === 'medium') {
                const next = item.next;

                if (!next || next.data.type !== 'Operator') {
                    this.remove(item);
                }
            }
        }
    });

    if (list.isEmpty) {
        list.insert(list.createItem({
            type: 'Identifier',
            name: 'normal'
        }));
    }
}

module.exports = compressFont;


/***/ }),

/***/ 9584:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);

const { hasOwnProperty } = Object.prototype;

function addRuleToMap(map, item, list, single) {
    const node = item.data;
    const name = cssTree.keyword(node.name).basename;
    const id = node.name.toLowerCase() + '/' + (node.prelude ? node.prelude.id : null);

    if (!hasOwnProperty.call(map, name)) {
        map[name] = Object.create(null);
    }

    if (single) {
        delete map[name][id];
    }

    if (!hasOwnProperty.call(map[name], id)) {
        map[name][id] = new cssTree.List();
    }

    map[name][id].append(list.remove(item));
}

function relocateAtrules(ast, options) {
    const collected = Object.create(null);
    let topInjectPoint = null;

    ast.children.forEach(function(node, item, list) {
        if (node.type === 'Atrule') {
            const name = cssTree.keyword(node.name).basename;

            switch (name) {
                case 'keyframes':
                    addRuleToMap(collected, item, list, true);
                    return;

                case 'media':
                    if (options.forceMediaMerge) {
                        addRuleToMap(collected, item, list, false);
                        return;
                    }
                    break;
            }

            if (topInjectPoint === null &&
                name !== 'charset' &&
                name !== 'import') {
                topInjectPoint = item;
            }
        } else {
            if (topInjectPoint === null) {
                topInjectPoint = item;
            }
        }
    });

    for (const atrule in collected) {
        for (const id in collected[atrule]) {
            ast.children.insertList(
                collected[atrule][id],
                atrule === 'media' ? null : topInjectPoint
            );
        }
    }
}
function isMediaRule(node) {
    return node.type === 'Atrule' && node.name === 'media';
}

function processAtrule(node, item, list) {
    if (!isMediaRule(node)) {
        return;
    }

    const prev = item.prev && item.prev.data;

    if (!prev || !isMediaRule(prev)) {
        return;
    }

    // merge @media with same query
    if (node.prelude &&
        prev.prelude &&
        node.prelude.id === prev.prelude.id) {
        prev.block.children.appendList(node.block.children);
        list.remove(item);

        // TODO: use it when we can refer to several points in source
        // prev.loc = {
        //     primary: prev.loc,
        //     merged: node.loc
        // };
    }
}

function rejoinAtrule(ast, options) {
    relocateAtrules(ast, options);

    cssTree.walk(ast, {
        visit: 'Atrule',
        reverse: true,
        enter: processAtrule
    });
}

module.exports = rejoinAtrule;


/***/ }),

/***/ 58:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const utils = __webpack_require__(6013);

function processRule(node, item, list) {
    const selectors = node.prelude.children;
    const declarations = node.block.children;

    list.prevUntil(item.prev, function(prev) {
        // skip non-ruleset node if safe
        if (prev.type !== 'Rule') {
            return utils.unsafeToSkipNode.call(selectors, prev);
        }

        const prevSelectors = prev.prelude.children;
        const prevDeclarations = prev.block.children;

        // try to join rulesets with equal pseudo signature
        if (node.pseudoSignature === prev.pseudoSignature) {
            // try to join by selectors
            if (utils.isEqualSelectors(prevSelectors, selectors)) {
                prevDeclarations.appendList(declarations);
                list.remove(item);
                return true;
            }

            // try to join by declarations
            if (utils.isEqualDeclarations(declarations, prevDeclarations)) {
                utils.addSelectors(prevSelectors, selectors);
                list.remove(item);
                return true;
            }
        }

        // go to prev ruleset if has no selector similarities
        return utils.hasSimilarSelectors(selectors, prevSelectors);
    });
}

// NOTE: direction should be left to right, since rulesets merge to left
// ruleset. When direction right to left unmerged rulesets may prevent lookup
// TODO: remove initial merge
function initialMergeRule(ast) {
    cssTree.walk(ast, {
        visit: 'Rule',
        enter: processRule
    });
}

module.exports = initialMergeRule;


/***/ }),

/***/ 938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);

function processRule(node, item, list) {
    const selectors = node.prelude.children;

    // generate new rule sets:
    // .a, .b { color: red; }
    // ->
    // .a { color: red; }
    // .b { color: red; }

    // while there are more than 1 simple selector split for rulesets
    while (selectors.head !== selectors.tail) {
        const newSelectors = new cssTree.List();

        newSelectors.insert(selectors.remove(selectors.head));

        list.insert(list.createItem({
            type: 'Rule',
            loc: node.loc,
            prelude: {
                type: 'SelectorList',
                loc: node.prelude.loc,
                children: newSelectors
            },
            block: {
                type: 'Block',
                loc: node.block.loc,
                children: node.block.children.copy()
            },
            pseudoSignature: node.pseudoSignature
        }), item);
    }
}

function disjoinRule(ast) {
    cssTree.walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter: processRule
    });
}

module.exports = disjoinRule;


/***/ }),

/***/ 4424:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);

const REPLACE = 1;
const REMOVE = 2;
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const SIDES = ['top', 'right', 'bottom', 'left'];
const SIDE = {
    'margin-top': 'top',
    'margin-right': 'right',
    'margin-bottom': 'bottom',
    'margin-left': 'left',

    'padding-top': 'top',
    'padding-right': 'right',
    'padding-bottom': 'bottom',
    'padding-left': 'left',

    'border-top-color': 'top',
    'border-right-color': 'right',
    'border-bottom-color': 'bottom',
    'border-left-color': 'left',
    'border-top-width': 'top',
    'border-right-width': 'right',
    'border-bottom-width': 'bottom',
    'border-left-width': 'left',
    'border-top-style': 'top',
    'border-right-style': 'right',
    'border-bottom-style': 'bottom',
    'border-left-style': 'left'
};
const MAIN_PROPERTY = {
    'margin': 'margin',
    'margin-top': 'margin',
    'margin-right': 'margin',
    'margin-bottom': 'margin',
    'margin-left': 'margin',

    'padding': 'padding',
    'padding-top': 'padding',
    'padding-right': 'padding',
    'padding-bottom': 'padding',
    'padding-left': 'padding',

    'border-color': 'border-color',
    'border-top-color': 'border-color',
    'border-right-color': 'border-color',
    'border-bottom-color': 'border-color',
    'border-left-color': 'border-color',
    'border-width': 'border-width',
    'border-top-width': 'border-width',
    'border-right-width': 'border-width',
    'border-bottom-width': 'border-width',
    'border-left-width': 'border-width',
    'border-style': 'border-style',
    'border-top-style': 'border-style',
    'border-right-style': 'border-style',
    'border-bottom-style': 'border-style',
    'border-left-style': 'border-style'
};

class TRBL {
    constructor(name) {
        this.name = name;
        this.loc = null;
        this.iehack = undefined;
        this.sides = {
            'top': null,
            'right': null,
            'bottom': null,
            'left': null
        };
    }

    getValueSequence(declaration, count) {
        const values = [];
        let iehack = '';
        const hasBadValues = declaration.value.type !== 'Value' || declaration.value.children.some(function(child) {
            let special = false;

            switch (child.type) {
                case 'Identifier':
                    switch (child.name) {
                        case '\\0':
                        case '\\9':
                            iehack = child.name;
                            return;

                        case 'inherit':
                        case 'initial':
                        case 'unset':
                        case 'revert':
                            special = child.name;
                            break;
                    }
                    break;

                case 'Dimension':
                    switch (child.unit) {
                        // is not supported until IE11
                        case 'rem':

                        // v* units is too buggy across browsers and better
                        // don't merge values with those units
                        case 'vw':
                        case 'vh':
                        case 'vmin':
                        case 'vmax':
                        case 'vm': // IE9 supporting "vm" instead of "vmin".
                            special = child.unit;
                            break;
                    }
                    break;

                case 'Hash': // color
                case 'Number':
                case 'Percentage':
                    break;

                case 'Function':
                    if (child.name === 'var') {
                        return true;
                    }

                    special = child.name;
                    break;

                default:
                    return true;  // bad value
            }

            values.push({
                node: child,
                special,
                important: declaration.important
            });
        });

        if (hasBadValues || values.length > count) {
            return false;
        }

        if (typeof this.iehack === 'string' && this.iehack !== iehack) {
            return false;
        }

        this.iehack = iehack; // move outside

        return values;
    }

    canOverride(side, value) {
        const currentValue = this.sides[side];

        return !currentValue || (value.important && !currentValue.important);
    }

    add(name, declaration) {
        function attemptToAdd() {
            const sides = this.sides;
            const side = SIDE[name];

            if (side) {
                if (side in sides === false) {
                    return false;
                }

                const values = this.getValueSequence(declaration, 1);

                if (!values || !values.length) {
                    return false;
                }

                // can mix only if specials are equal
                for (const key in sides) {
                    if (sides[key] !== null && sides[key].special !== values[0].special) {
                        return false;
                    }
                }

                if (!this.canOverride(side, values[0])) {
                    return true;
                }

                sides[side] = values[0];

                return true;
            } else if (name === this.name) {
                const values = this.getValueSequence(declaration, 4);

                if (!values || !values.length) {
                    return false;
                }

                switch (values.length) {
                    case 1:
                        values[RIGHT] = values[TOP];
                        values[BOTTOM] = values[TOP];
                        values[LEFT] = values[TOP];
                        break;

                    case 2:
                        values[BOTTOM] = values[TOP];
                        values[LEFT] = values[RIGHT];
                        break;

                    case 3:
                        values[LEFT] = values[RIGHT];
                        break;
                }

                // can mix only if specials are equal
                for (let i = 0; i < 4; i++) {
                    for (const key in sides) {
                        if (sides[key] !== null && sides[key].special !== values[i].special) {
                            return false;
                        }
                    }
                }

                for (let i = 0; i < 4; i++) {
                    if (this.canOverride(SIDES[i], values[i])) {
                        sides[SIDES[i]] = values[i];
                    }
                }

                return true;
            }
        }

        if (!attemptToAdd.call(this)) {
            return false;
        }

        // TODO: use it when we can refer to several points in source
        // if (this.loc) {
        //     this.loc = {
        //         primary: this.loc,
        //         merged: declaration.loc
        //     };
        // } else {
        //     this.loc = declaration.loc;
        // }
        if (!this.loc) {
            this.loc = declaration.loc;
        }

        return true;
    }

    isOkToMinimize() {
        const top = this.sides.top;
        const right = this.sides.right;
        const bottom = this.sides.bottom;
        const left = this.sides.left;

        if (top && right && bottom && left) {
            const important =
                top.important +
                right.important +
                bottom.important +
                left.important;

            return important === 0 || important === 4;
        }

        return false;
    }

    getValue() {
        const result = new cssTree.List();
        const sides = this.sides;
        const values = [
            sides.top,
            sides.right,
            sides.bottom,
            sides.left
        ];
        const stringValues = [
            cssTree.generate(sides.top.node),
            cssTree.generate(sides.right.node),
            cssTree.generate(sides.bottom.node),
            cssTree.generate(sides.left.node)
        ];

        if (stringValues[LEFT] === stringValues[RIGHT]) {
            values.pop();
            if (stringValues[BOTTOM] === stringValues[TOP]) {
                values.pop();
                if (stringValues[RIGHT] === stringValues[TOP]) {
                    values.pop();
                }
            }
        }

        for (let i = 0; i < values.length; i++) {
            result.appendData(values[i].node);
        }

        if (this.iehack) {
            result.appendData({
                type: 'Identifier',
                loc: null,
                name: this.iehack
            });
        }

        return {
            type: 'Value',
            loc: null,
            children: result
        };
    }

    getDeclaration() {
        return {
            type: 'Declaration',
            loc: this.loc,
            important: this.sides.top.important,
            property: this.name,
            value: this.getValue()
        };
    }
}

function processRule(rule, shorts, shortDeclarations, lastShortSelector) {
    const declarations = rule.block.children;
    const selector = rule.prelude.children.first.id;

    rule.block.children.forEachRight(function(declaration, item) {
        const property = declaration.property;

        if (!MAIN_PROPERTY.hasOwnProperty(property)) {
            return;
        }

        const key = MAIN_PROPERTY[property];
        let shorthand;
        let operation;

        if (!lastShortSelector || selector === lastShortSelector) {
            if (key in shorts) {
                operation = REMOVE;
                shorthand = shorts[key];
            }
        }

        if (!shorthand || !shorthand.add(property, declaration)) {
            operation = REPLACE;
            shorthand = new TRBL(key);

            // if can't parse value ignore it and break shorthand children
            if (!shorthand.add(property, declaration)) {
                lastShortSelector = null;
                return;
            }
        }

        shorts[key] = shorthand;
        shortDeclarations.push({
            operation,
            block: declarations,
            item,
            shorthand
        });

        lastShortSelector = selector;
    });

    return lastShortSelector;
}

function processShorthands(shortDeclarations, markDeclaration) {
    shortDeclarations.forEach(function(item) {
        const shorthand = item.shorthand;

        if (!shorthand.isOkToMinimize()) {
            return;
        }

        if (item.operation === REPLACE) {
            item.item.data = markDeclaration(shorthand.getDeclaration());
        } else {
            item.block.remove(item.item);
        }
    });
}

function restructBlock(ast, indexer) {
    const stylesheetMap = {};
    const shortDeclarations = [];

    cssTree.walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter(node) {
            const stylesheet = this.block || this.stylesheet;
            const ruleId = (node.pseudoSignature || '') + '|' + node.prelude.children.first.id;
            let ruleMap;
            let shorts;

            if (!stylesheetMap.hasOwnProperty(stylesheet.id)) {
                ruleMap = {
                    lastShortSelector: null
                };
                stylesheetMap[stylesheet.id] = ruleMap;
            } else {
                ruleMap = stylesheetMap[stylesheet.id];
            }

            if (ruleMap.hasOwnProperty(ruleId)) {
                shorts = ruleMap[ruleId];
            } else {
                shorts = {};
                ruleMap[ruleId] = shorts;
            }

            ruleMap.lastShortSelector = processRule.call(this, node, shorts, shortDeclarations, ruleMap.lastShortSelector);
        }
    });

    processShorthands(shortDeclarations, indexer.declaration);
}

module.exports = restructBlock;


/***/ }),

/***/ 7563:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);

let fingerprintId = 1;
const dontRestructure = new Set([
    'src' // https://github.com/afelix/csso/issues/50
]);

const DONT_MIX_VALUE = {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility
    'display': /table|ruby|flex|-(flex)?box$|grid|contents|run-in/i,
    // https://developer.mozilla.org/en/docs/Web/CSS/text-align
    'text-align': /^(start|end|match-parent|justify-all)$/i
};

const SAFE_VALUES = {
    cursor: [
        'auto', 'crosshair', 'default', 'move', 'text', 'wait', 'help',
        'n-resize', 'e-resize', 's-resize', 'w-resize',
        'ne-resize', 'nw-resize', 'se-resize', 'sw-resize',
        'pointer', 'progress', 'not-allowed', 'no-drop', 'vertical-text', 'all-scroll',
        'col-resize', 'row-resize'
    ],
    overflow: [
        'hidden', 'visible', 'scroll', 'auto'
    ],
    position: [
        'static', 'relative', 'absolute', 'fixed'
    ]
};

const NEEDLESS_TABLE = {
    'border-width': ['border'],
    'border-style': ['border'],
    'border-color': ['border'],
    'border-top': ['border'],
    'border-right': ['border'],
    'border-bottom': ['border'],
    'border-left': ['border'],
    'border-top-width': ['border-top', 'border-width', 'border'],
    'border-right-width': ['border-right', 'border-width', 'border'],
    'border-bottom-width': ['border-bottom', 'border-width', 'border'],
    'border-left-width': ['border-left', 'border-width', 'border'],
    'border-top-style': ['border-top', 'border-style', 'border'],
    'border-right-style': ['border-right', 'border-style', 'border'],
    'border-bottom-style': ['border-bottom', 'border-style', 'border'],
    'border-left-style': ['border-left', 'border-style', 'border'],
    'border-top-color': ['border-top', 'border-color', 'border'],
    'border-right-color': ['border-right', 'border-color', 'border'],
    'border-bottom-color': ['border-bottom', 'border-color', 'border'],
    'border-left-color': ['border-left', 'border-color', 'border'],
    'margin-top': ['margin'],
    'margin-right': ['margin'],
    'margin-bottom': ['margin'],
    'margin-left': ['margin'],
    'padding-top': ['padding'],
    'padding-right': ['padding'],
    'padding-bottom': ['padding'],
    'padding-left': ['padding'],
    'font-style': ['font'],
    'font-variant': ['font'],
    'font-weight': ['font'],
    'font-size': ['font'],
    'font-family': ['font'],
    'list-style-type': ['list-style'],
    'list-style-position': ['list-style'],
    'list-style-image': ['list-style']
};

function getPropertyFingerprint(propertyName, declaration, fingerprints) {
    const realName = cssTree.property(propertyName).basename;

    if (realName === 'background') {
        return propertyName + ':' + cssTree.generate(declaration.value);
    }

    const declarationId = declaration.id;
    let fingerprint = fingerprints[declarationId];

    if (!fingerprint) {
        switch (declaration.value.type) {
            case 'Value':
                const special = {};
                let vendorId = '';
                let iehack = '';
                let raw = false;

                declaration.value.children.forEach(function walk(node) {
                    switch (node.type) {
                        case 'Value':
                        case 'Brackets':
                        case 'Parentheses':
                            node.children.forEach(walk);
                            break;

                        case 'Raw':
                            raw = true;
                            break;

                        case 'Identifier': {
                            const { name } = node;

                            if (!vendorId) {
                                vendorId = cssTree.keyword(name).vendor;
                            }

                            if (/\\[09]/.test(name)) {
                                iehack = RegExp.lastMatch;
                            }

                            if (SAFE_VALUES.hasOwnProperty(realName)) {
                                if (SAFE_VALUES[realName].indexOf(name) === -1) {
                                    special[name] = true;
                                }
                            } else if (DONT_MIX_VALUE.hasOwnProperty(realName)) {
                                if (DONT_MIX_VALUE[realName].test(name)) {
                                    special[name] = true;
                                }
                            }

                            break;
                        }

                        case 'Function': {
                            let { name } = node;

                            if (!vendorId) {
                                vendorId = cssTree.keyword(name).vendor;
                            }

                            if (name === 'rect') {
                                // there are 2 forms of rect:
                                //   rect(<top>, <right>, <bottom>, <left>) - standart
                                //   rect(<top> <right> <bottom> <left>) – backwards compatible syntax
                                // only the same form values can be merged
                                const hasComma = node.children.some((node) =>
                                    node.type === 'Operator' && node.value === ','
                                );

                                if (!hasComma) {
                                    name = 'rect-backward';
                                }
                            }

                            special[name + '()'] = true;

                            // check nested tokens too
                            node.children.forEach(walk);

                            break;
                        }

                        case 'Dimension': {
                            const { unit } = node;

                            if (/\\[09]/.test(unit)) {
                                iehack = RegExp.lastMatch;
                            }

                            switch (unit) {
                                // is not supported until IE11
                                case 'rem':

                                // v* units is too buggy across browsers and better
                                // don't merge values with those units
                                case 'vw':
                                case 'vh':
                                case 'vmin':
                                case 'vmax':
                                case 'vm': // IE9 supporting "vm" instead of "vmin".
                                    special[unit] = true;
                                    break;
                            }

                            break;
                        }
                    }
                });

                fingerprint = raw
                    ? '!' + fingerprintId++
                    : '!' + Object.keys(special).sort() + '|' + iehack + vendorId;
                break;

            case 'Raw':
                fingerprint = '!' + declaration.value.value;
                break;

            default:
                fingerprint = cssTree.generate(declaration.value);
        }

        fingerprints[declarationId] = fingerprint;
    }

    return propertyName + fingerprint;
}

function needless(props, declaration, fingerprints) {
    const property = cssTree.property(declaration.property);

    if (NEEDLESS_TABLE.hasOwnProperty(property.basename)) {
        const table = NEEDLESS_TABLE[property.basename];

        for (const entry of table) {
            const ppre = getPropertyFingerprint(property.prefix + entry, declaration, fingerprints);
            const prev = props.hasOwnProperty(ppre) ? props[ppre] : null;

            if (prev && (!declaration.important || prev.item.data.important)) {
                return prev;
            }
        }
    }
}

function processRule(rule, item, list, props, fingerprints) {
    const declarations = rule.block.children;

    declarations.forEachRight(function(declaration, declarationItem) {
        const { property } = declaration;
        const fingerprint = getPropertyFingerprint(property, declaration, fingerprints);
        const prev = props[fingerprint];

        if (prev && !dontRestructure.has(property)) {
            if (declaration.important && !prev.item.data.important) {
                props[fingerprint] = {
                    block: declarations,
                    item: declarationItem
                };

                prev.block.remove(prev.item);

                // TODO: use it when we can refer to several points in source
                // declaration.loc = {
                //     primary: declaration.loc,
                //     merged: prev.item.data.loc
                // };
            } else {
                declarations.remove(declarationItem);

                // TODO: use it when we can refer to several points in source
                // prev.item.data.loc = {
                //     primary: prev.item.data.loc,
                //     merged: declaration.loc
                // };
            }
        } else {
            const prev = needless(props, declaration, fingerprints);

            if (prev) {
                declarations.remove(declarationItem);

                // TODO: use it when we can refer to several points in source
                // prev.item.data.loc = {
                //     primary: prev.item.data.loc,
                //     merged: declaration.loc
                // };
            } else {
                declaration.fingerprint = fingerprint;

                props[fingerprint] = {
                    block: declarations,
                    item: declarationItem
                };
            }
        }
    });

    if (declarations.isEmpty) {
        list.remove(item);
    }
}

function restructBlock(ast) {
    const stylesheetMap = {};
    const fingerprints = Object.create(null);

    cssTree.walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter(node, item, list) {
            const stylesheet = this.block || this.stylesheet;
            const ruleId = (node.pseudoSignature || '') + '|' + node.prelude.children.first.id;
            let ruleMap;
            let props;

            if (!stylesheetMap.hasOwnProperty(stylesheet.id)) {
                ruleMap = {};
                stylesheetMap[stylesheet.id] = ruleMap;
            } else {
                ruleMap = stylesheetMap[stylesheet.id];
            }

            if (ruleMap.hasOwnProperty(ruleId)) {
                props = ruleMap[ruleId];
            } else {
                props = {};
                ruleMap[ruleId] = props;
            }

            processRule.call(this, node, item, list, props, fingerprints);
        }
    });
}

module.exports = restructBlock;


/***/ }),

/***/ 3369:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const utils = __webpack_require__(6013);

/*
    At this step all rules has single simple selector. We try to join by equal
    declaration blocks to first rule, e.g.

    .a { color: red }
    b { ... }
    .b { color: red }
    ->
    .a, .b { color: red }
    b { ... }
*/

function processRule(node, item, list) {
    const selectors = node.prelude.children;
    const declarations = node.block.children;
    const nodeCompareMarker = selectors.first.compareMarker;
    const skippedCompareMarkers = {};

    list.nextUntil(item.next, function(next, nextItem) {
        // skip non-ruleset node if safe
        if (next.type !== 'Rule') {
            return utils.unsafeToSkipNode.call(selectors, next);
        }

        if (node.pseudoSignature !== next.pseudoSignature) {
            return true;
        }

        const nextFirstSelector = next.prelude.children.head;
        const nextDeclarations = next.block.children;
        const nextCompareMarker = nextFirstSelector.data.compareMarker;

        // if next ruleset has same marked as one of skipped then stop joining
        if (nextCompareMarker in skippedCompareMarkers) {
            return true;
        }

        // try to join by selectors
        if (selectors.head === selectors.tail) {
            if (selectors.first.id === nextFirstSelector.data.id) {
                declarations.appendList(nextDeclarations);
                list.remove(nextItem);
                return;
            }
        }

        // try to join by properties
        if (utils.isEqualDeclarations(declarations, nextDeclarations)) {
            const nextStr = nextFirstSelector.data.id;

            selectors.some((data, item) => {
                const curStr = data.id;

                if (nextStr < curStr) {
                    selectors.insert(nextFirstSelector, item);
                    return true;
                }

                if (!item.next) {
                    selectors.insert(nextFirstSelector);
                    return true;
                }
            });

            list.remove(nextItem);
            return;
        }

        // go to next ruleset if current one can be skipped (has no equal specificity nor element selector)
        if (nextCompareMarker === nodeCompareMarker) {
            return true;
        }

        skippedCompareMarkers[nextCompareMarker] = true;
    });
}

function mergeRule(ast) {
    cssTree.walk(ast, {
        visit: 'Rule',
        enter: processRule
    });
}

module.exports = mergeRule;


/***/ }),

/***/ 8023:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const utils = __webpack_require__(6013);

function calcSelectorLength(list) {
    return list.reduce((res, data) => res + data.id.length + 1, 0) - 1;
}

function calcDeclarationsLength(tokens) {
    let length = 0;

    for (const token of tokens) {
        length += token.length;
    }

    return (
        length +          // declarations
        tokens.length - 1 // delimeters
    );
}

function processRule(node, item, list) {
    const avoidRulesMerge = this.block !== null ? this.block.avoidRulesMerge : false;
    const selectors = node.prelude.children;
    const block = node.block;
    const disallowDownMarkers = Object.create(null);
    let allowMergeUp = true;
    let allowMergeDown = true;

    list.prevUntil(item.prev, function(prev, prevItem) {
        const prevBlock = prev.block;
        const prevType = prev.type;

        if (prevType !== 'Rule') {
            const unsafe = utils.unsafeToSkipNode.call(selectors, prev);

            if (!unsafe && prevType === 'Atrule' && prevBlock) {
                cssTree.walk(prevBlock, {
                    visit: 'Rule',
                    enter(node) {
                        node.prelude.children.forEach((data) => {
                            disallowDownMarkers[data.compareMarker] = true;
                        });
                    }
                });
            }

            return unsafe;
        }

        if (node.pseudoSignature !== prev.pseudoSignature) {
            return true;
        }

        const prevSelectors = prev.prelude.children;

        allowMergeDown = !prevSelectors.some((selector) =>
            selector.compareMarker in disallowDownMarkers
        );

        // try prev ruleset if simpleselectors has no equal specifity and element selector
        if (!allowMergeDown && !allowMergeUp) {
            return true;
        }

        // try to join by selectors
        if (allowMergeUp && utils.isEqualSelectors(prevSelectors, selectors)) {
            prevBlock.children.appendList(block.children);
            list.remove(item);

            return true;
        }

        // try to join by properties
        const diff = utils.compareDeclarations(block.children, prevBlock.children);

        // console.log(diff.eq, diff.ne1, diff.ne2);

        if (diff.eq.length) {
            if (!diff.ne1.length && !diff.ne2.length) {
                // equal blocks
                if (allowMergeDown) {
                    utils.addSelectors(selectors, prevSelectors);
                    list.remove(prevItem);
                }

                return true;
            } else if (!avoidRulesMerge) { /* probably we don't need to prevent those merges for @keyframes
                                              TODO: need to be checked */

                if (diff.ne1.length && !diff.ne2.length) {
                    // prevBlock is subset block
                    const selectorLength = calcSelectorLength(selectors);
                    const blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    if (allowMergeUp && selectorLength < blockLength) {
                        utils.addSelectors(prevSelectors, selectors);
                        block.children.fromArray(diff.ne1);
                    }
                } else if (!diff.ne1.length && diff.ne2.length) {
                    // node is subset of prevBlock
                    const selectorLength = calcSelectorLength(prevSelectors);
                    const blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    if (allowMergeDown && selectorLength < blockLength) {
                        utils.addSelectors(selectors, prevSelectors);
                        prevBlock.children.fromArray(diff.ne2);
                    }
                } else {
                    // diff.ne1.length && diff.ne2.length
                    // extract equal block
                    const newSelector = {
                        type: 'SelectorList',
                        loc: null,
                        children: utils.addSelectors(prevSelectors.copy(), selectors)
                    };
                    const newBlockLength = calcSelectorLength(newSelector.children) + 2; // selectors length + curly braces length
                    const blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    // create new ruleset if declarations length greater than
                    // ruleset description overhead
                    if (blockLength >= newBlockLength) {
                        const newItem = list.createItem({
                            type: 'Rule',
                            loc: null,
                            prelude: newSelector,
                            block: {
                                type: 'Block',
                                loc: null,
                                children: new cssTree.List().fromArray(diff.eq)
                            },
                            pseudoSignature: node.pseudoSignature
                        });

                        block.children.fromArray(diff.ne1);
                        prevBlock.children.fromArray(diff.ne2overrided);

                        if (allowMergeUp) {
                            list.insert(newItem, prevItem);
                        } else {
                            list.insert(newItem, item);
                        }

                        return true;
                    }
                }
            }
        }

        if (allowMergeUp) {
            // TODO: disallow up merge only if any property interception only (i.e. diff.ne2overrided.length > 0);
            // await property families to find property interception correctly
            allowMergeUp = !prevSelectors.some((prevSelector) =>
                selectors.some((selector) =>
                    selector.compareMarker === prevSelector.compareMarker
                )
            );
        }

        prevSelectors.forEach((data) => {
            disallowDownMarkers[data.compareMarker] = true;
        });
    });
}

function restructRule(ast) {
    cssTree.walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter: processRule
    });
}

module.exports = restructRule;


/***/ }),

/***/ 1883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const index = __webpack_require__(1306);
const _1MergeAtrule = __webpack_require__(9584);
const _2InitialMergeRuleset = __webpack_require__(58);
const _3DisjoinRuleset = __webpack_require__(938);
const _4RestructShorthand = __webpack_require__(4424);
const _6RestructBlock = __webpack_require__(7563);
const _7MergeRuleset = __webpack_require__(3369);
const _8RestructRuleset = __webpack_require__(8023);

function restructure(ast, options) {
    // prepare ast for restructing
    const indexer = index(ast, options);
    options.logger('prepare', ast);

    _1MergeAtrule(ast, options);
    options.logger('mergeAtrule', ast);

    _2InitialMergeRuleset(ast);
    options.logger('initialMergeRuleset', ast);

    _3DisjoinRuleset(ast);
    options.logger('disjoinRuleset', ast);

    _4RestructShorthand(ast, indexer);
    options.logger('restructShorthand', ast);

    _6RestructBlock(ast);
    options.logger('restructBlock', ast);

    _7MergeRuleset(ast);
    options.logger('mergeRuleset', ast);

    _8RestructRuleset(ast);
    options.logger('restructRuleset', ast);
}

module.exports = restructure;


/***/ }),

/***/ 4200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);

class Index {
    constructor() {
        this.map = new Map();
    }
    resolve(str) {
        let index = this.map.get(str);

        if (index === undefined) {
            index = this.map.size + 1;
            this.map.set(str, index);
        }

        return index;
    }
}
function createDeclarationIndexer() {
    const ids = new Index();

    return function markDeclaration(node) {
        const id = cssTree.generate(node);

        node.id = ids.resolve(id);
        node.length = id.length;
        node.fingerprint = null;

        return node;
    };
}

module.exports = createDeclarationIndexer;


/***/ }),

/***/ 1306:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const createDeclarationIndexer = __webpack_require__(4200);
const processSelector = __webpack_require__(7363);

function prepare(ast, options) {
    const markDeclaration = createDeclarationIndexer();

    cssTree.walk(ast, {
        visit: 'Rule',
        enter(node) {
            node.block.children.forEach(markDeclaration);
            processSelector(node, options.usage);
        }
    });

    cssTree.walk(ast, {
        visit: 'Atrule',
        enter(node) {
            if (node.prelude) {
                node.prelude.id = null; // pre-init property to avoid multiple hidden class for generate
                node.prelude.id = cssTree.generate(node.prelude);
            }

            // compare keyframe selectors by its values
            // NOTE: still no clarification about problems with keyframes selector grouping (issue #197)
            if (cssTree.keyword(node.name).basename === 'keyframes') {
                node.block.avoidRulesMerge = true;  /* probably we don't need to prevent those merges for @keyframes
                                                       TODO: need to be checked */
                node.block.children.forEach(function(rule) {
                    rule.prelude.children.forEach(function(simpleselector) {
                        simpleselector.compareMarker = simpleselector.id;
                    });
                });
            }
        }
    });

    return {
        declaration: markDeclaration
    };
}

module.exports = prepare;


/***/ }),

/***/ 7363:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const specificity = __webpack_require__(567);

const nonFreezePseudoElements = new Set([
    'first-letter',
    'first-line',
    'after',
    'before'
]);
const nonFreezePseudoClasses = new Set([
    'link',
    'visited',
    'hover',
    'active',
    'first-letter',
    'first-line',
    'after',
    'before'
]);

function processSelector(node, usageData) {
    const pseudos = new Set();

    node.prelude.children.forEach(function(simpleSelector) {
        let tagName = '*';
        let scope = 0;

        simpleSelector.children.forEach(function(node) {
            switch (node.type) {
                case 'ClassSelector':
                    if (usageData && usageData.scopes) {
                        const classScope = usageData.scopes[node.name] || 0;

                        if (scope !== 0 && classScope !== scope) {
                            throw new Error('Selector can\'t has classes from different scopes: ' + cssTree.generate(simpleSelector));
                        }

                        scope = classScope;
                    }

                    break;

                case 'PseudoClassSelector': {
                    const name = node.name.toLowerCase();

                    if (!nonFreezePseudoClasses.has(name)) {
                        pseudos.add(`:${name}`);
                    }

                    break;
                }

                case 'PseudoElementSelector': {
                    const name = node.name.toLowerCase();

                    if (!nonFreezePseudoElements.has(name)) {
                        pseudos.add(`::${name}`);
                    }

                    break;
                }

                case 'TypeSelector':
                    tagName = node.name.toLowerCase();
                    break;

                case 'AttributeSelector':
                    if (node.flags) {
                        pseudos.add(`[${node.flags.toLowerCase()}]`);
                    }

                    break;

                case 'Combinator':
                    tagName = '*';
                    break;
            }
        });

        simpleSelector.compareMarker = specificity(simpleSelector).toString();
        simpleSelector.id = null; // pre-init property to avoid multiple hidden class
        simpleSelector.id = cssTree.generate(simpleSelector);

        if (scope) {
            simpleSelector.compareMarker += ':' + scope;
        }

        if (tagName !== '*') {
            simpleSelector.compareMarker += ',' + tagName;
        }
    });

    // add property to all rule nodes to avoid multiple hidden class
    node.pseudoSignature = pseudos.size > 0
        ? [...pseudos].sort().join(',')
        : false;
}

module.exports = processSelector;


/***/ }),

/***/ 567:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);

function ensureSelectorList(node) {
    if (node.type === 'Raw') {
        return cssTree.parse(node.value, { context: 'selectorList' });
    }

    return node;
}

function maxSpecificity(a, b) {
    for (let i = 0; i < 3; i++) {
        if (a[i] !== b[i]) {
            return a[i] > b[i] ? a : b;
        }
    }

    return a;
}

function maxSelectorListSpecificity(selectorList) {
    return ensureSelectorList(selectorList).children.reduce(
        (result, node) => maxSpecificity(specificity(node), result),
        [0, 0, 0]
    );
}

// §16. Calculating a selector’s specificity
// https://www.w3.org/TR/selectors-4/#specificity-rules
function specificity(simpleSelector) {
    let A = 0;
    let B = 0;
    let C = 0;

    // A selector’s specificity is calculated for a given element as follows:
    simpleSelector.children.forEach((node) => {
        switch (node.type) {
            // count the number of ID selectors in the selector (= A)
            case 'IdSelector':
                A++;
                break;

            // count the number of class selectors, attributes selectors, ...
            case 'ClassSelector':
            case 'AttributeSelector':
                B++;
                break;

            // ... and pseudo-classes in the selector (= B)
            case 'PseudoClassSelector':
                switch (node.name.toLowerCase()) {
                    // The specificity of an :is(), :not(), or :has() pseudo-class is replaced
                    // by the specificity of the most specific complex selector in its selector list argument.
                    case 'not':
                    case 'has':
                    case 'is':
                    // :matches() is used before it was renamed to :is()
                    // https://github.com/w3c/csswg-drafts/issues/3258
                    case 'matches':
                    // Older browsers support :is() functionality as prefixed pseudo-class :any()
                    // https://developer.mozilla.org/en-US/docs/Web/CSS/:is
                    case '-webkit-any':
                    case '-moz-any': {
                        const [a, b, c] = maxSelectorListSpecificity(node.children.first);

                        A += a;
                        B += b;
                        C += c;

                        break;
                    }

                    // Analogously, the specificity of an :nth-child() or :nth-last-child() selector
                    // is the specificity of the pseudo class itself (counting as one pseudo-class selector)
                    // plus the specificity of the most specific complex selector in its selector list argument (if any).
                    case 'nth-child':
                    case 'nth-last-child': {
                        const arg = node.children.first;

                        if (arg.type === 'Nth' && arg.selector) {
                            const [a, b, c] = maxSelectorListSpecificity(arg.selector);

                            A += a;
                            B += b + 1;
                            C += c;
                        } else {
                            B++;
                        }

                        break;
                    }

                    // The specificity of a :where() pseudo-class is replaced by zero.
                    case 'where':
                        break;

                    // The four Level 2 pseudo-elements (::before, ::after, ::first-line, and ::first-letter) may,
                    // for legacy reasons, be represented using the <pseudo-class-selector> grammar,
                    // with only a single ":" character at their start.
                    // https://www.w3.org/TR/selectors-4/#single-colon-pseudos
                    case 'before':
                    case 'after':
                    case 'first-line':
                    case 'first-letter':
                        C++;
                        break;

                    default:
                        B++;
                }
                break;

            // count the number of type selectors ...
            case 'TypeSelector':
                // ignore the universal selector
                if (!node.name.endsWith('*')) {
                    C++;
                }
                break;

            // ... and pseudo-elements in the selector (= C)
            case 'PseudoElementSelector':
                C++;
                break;
        }
    });

    return [A, B, C];
}

module.exports = specificity;


/***/ }),

/***/ 6013:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const { hasOwnProperty } = Object.prototype;

function isEqualSelectors(a, b) {
    let cursor1 = a.head;
    let cursor2 = b.head;

    while (cursor1 !== null && cursor2 !== null && cursor1.data.id === cursor2.data.id) {
        cursor1 = cursor1.next;
        cursor2 = cursor2.next;
    }

    return cursor1 === null && cursor2 === null;
}

function isEqualDeclarations(a, b) {
    let cursor1 = a.head;
    let cursor2 = b.head;

    while (cursor1 !== null && cursor2 !== null && cursor1.data.id === cursor2.data.id) {
        cursor1 = cursor1.next;
        cursor2 = cursor2.next;
    }

    return cursor1 === null && cursor2 === null;
}

function compareDeclarations(declarations1, declarations2) {
    const result = {
        eq: [],
        ne1: [],
        ne2: [],
        ne2overrided: []
    };

    const fingerprints = Object.create(null);
    const declarations2hash = Object.create(null);

    for (let cursor = declarations2.head; cursor; cursor = cursor.next)  {
        declarations2hash[cursor.data.id] = true;
    }

    for (let cursor = declarations1.head; cursor; cursor = cursor.next)  {
        const data = cursor.data;

        if (data.fingerprint) {
            fingerprints[data.fingerprint] = data.important;
        }

        if (declarations2hash[data.id]) {
            declarations2hash[data.id] = false;
            result.eq.push(data);
        } else {
            result.ne1.push(data);
        }
    }

    for (let cursor = declarations2.head; cursor; cursor = cursor.next)  {
        const data = cursor.data;

        if (declarations2hash[data.id]) {
            // when declarations1 has an overriding declaration, this is not a difference
            // unless no !important is used on prev and !important is used on the following
            if (!hasOwnProperty.call(fingerprints, data.fingerprint) ||
                (!fingerprints[data.fingerprint] && data.important)) {
                result.ne2.push(data);
            }

            result.ne2overrided.push(data);
        }
    }

    return result;
}

function addSelectors(dest, source) {
    source.forEach((sourceData) => {
        const newStr = sourceData.id;
        let cursor = dest.head;

        while (cursor) {
            const nextStr = cursor.data.id;

            if (nextStr === newStr) {
                return;
            }

            if (nextStr > newStr) {
                break;
            }

            cursor = cursor.next;
        }

        dest.insert(dest.createItem(sourceData), cursor);
    });

    return dest;
}

// check if simpleselectors has no equal specificity and element selector
function hasSimilarSelectors(selectors1, selectors2) {
    let cursor1 = selectors1.head;

    while (cursor1 !== null) {
        let cursor2 = selectors2.head;

        while (cursor2 !== null) {
            if (cursor1.data.compareMarker === cursor2.data.compareMarker) {
                return true;
            }

            cursor2 = cursor2.next;
        }

        cursor1 = cursor1.next;
    }

    return false;
}

// test node can't to be skipped
function unsafeToSkipNode(node) {
    switch (node.type) {
        case 'Rule':
            // unsafe skip ruleset with selector similarities
            return hasSimilarSelectors(node.prelude.children, this);

        case 'Atrule':
            // can skip at-rules with blocks
            if (node.block) {
                // unsafe skip at-rule if block contains something unsafe to skip
                return node.block.children.some(unsafeToSkipNode, this);
            }
            break;

        case 'Declaration':
            return false;
    }

    // unsafe by default
    return true;
}

exports.addSelectors = addSelectors;
exports.compareDeclarations = compareDeclarations;
exports.hasSimilarSelectors = hasSimilarSelectors;
exports.isEqualDeclarations = isEqualDeclarations;
exports.isEqualSelectors = isEqualSelectors;
exports.unsafeToSkipNode = unsafeToSkipNode;


/***/ }),

/***/ 4061:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const cssTree = __webpack_require__(3889);
const compress = __webpack_require__(8039);
const specificity = __webpack_require__(567);

function encodeString(value) {
    const stringApostrophe = cssTree.string.encode(value, true);
    const stringQuote = cssTree.string.encode(value);

    return stringApostrophe.length < stringQuote.length
        ? stringApostrophe
        : stringQuote;
}

const {
    lexer,
    tokenize,
    parse,
    generate,
    walk,
    find,
    findLast,
    findAll,
    fromPlainObject,
    toPlainObject
} = cssTree.fork({
    node: {
        String: {
            generate(node) {
                this.token(cssTree.tokenTypes.String, encodeString(node.value));
            }
        },
        Url: {
            generate(node) {
                const encodedUrl = cssTree.url.encode(node.value);
                const string = encodeString(node.value);

                this.token(cssTree.tokenTypes.Url,
                    encodedUrl.length <= string.length + 5 /* "url()".length */
                        ? encodedUrl
                        : 'url(' + string + ')'
                );
            }
        }
    }
});

exports.compress = compress;
exports.specificity = specificity;
exports.find = find;
exports.findAll = findAll;
exports.findLast = findLast;
exports.fromPlainObject = fromPlainObject;
exports.generate = generate;
exports.lexer = lexer;
exports.parse = parse;
exports.toPlainObject = toPlainObject;
exports.tokenize = tokenize;
exports.walk = walk;


/***/ }),

/***/ 8748:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const { hasOwnProperty } = Object.prototype;

function buildMap(list, caseInsensitive) {
    const map = Object.create(null);

    if (!Array.isArray(list)) {
        return null;
    }

    for (let name of list) {
        if (caseInsensitive) {
            name = name.toLowerCase();
        }

        map[name] = true;
    }

    return map;
}

function buildList(data) {
    if (!data) {
        return null;
    }

    const tags = buildMap(data.tags, true);
    const ids = buildMap(data.ids);
    const classes = buildMap(data.classes);

    if (tags === null &&
        ids === null &&
        classes === null) {
        return null;
    }

    return {
        tags,
        ids,
        classes
    };
}

function buildIndex(data) {
    let scopes = false;

    if (data.scopes && Array.isArray(data.scopes)) {
        scopes = Object.create(null);

        for (let i = 0; i < data.scopes.length; i++) {
            const list = data.scopes[i];

            if (!list || !Array.isArray(list)) {
                throw new Error('Wrong usage format');
            }

            for (const name of list) {
                if (hasOwnProperty.call(scopes, name)) {
                    throw new Error(`Class can't be used for several scopes: ${name}`);
                }

                scopes[name] = i + 1;
            }
        }
    }

    return {
        whitelist: buildList(data),
        blacklist: buildList(data.blacklist),
        scopes
    };
}

exports.buildIndex = buildIndex;


/***/ }),

/***/ 3460:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const processSelector = __webpack_require__(7363);
const utils$1 = __webpack_require__(6013);



exports.processSelector = processSelector;
exports.addSelectors = utils$1.addSelectors;
exports.compareDeclarations = utils$1.compareDeclarations;
exports.hasSimilarSelectors = utils$1.hasSimilarSelectors;
exports.isEqualDeclarations = utils$1.isEqualDeclarations;
exports.isEqualSelectors = utils$1.isEqualSelectors;
exports.unsafeToSkipNode = utils$1.unsafeToSkipNode;


/***/ }),

/***/ 2875:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const { version } = __webpack_require__(6428);

exports.version = version;


/***/ }),

/***/ 8663:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"atrules\":{\"charset\":{\"prelude\":\"<string>\"},\"font-face\":{\"descriptors\":{\"unicode-range\":{\"comment\":\"replaces <unicode-range>, an old production name\",\"syntax\":\"<urange>#\"}}}},\"properties\":{\"-moz-background-clip\":{\"comment\":\"deprecated syntax in old Firefox, https://developer.mozilla.org/en/docs/Web/CSS/background-clip\",\"syntax\":\"padding | border\"},\"-moz-border-radius-bottomleft\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius\",\"syntax\":\"<'border-bottom-left-radius'>\"},\"-moz-border-radius-bottomright\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius\",\"syntax\":\"<'border-bottom-right-radius'>\"},\"-moz-border-radius-topleft\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius\",\"syntax\":\"<'border-top-left-radius'>\"},\"-moz-border-radius-topright\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius\",\"syntax\":\"<'border-bottom-right-radius'>\"},\"-moz-control-character-visibility\":{\"comment\":\"firefox specific keywords, https://bugzilla.mozilla.org/show_bug.cgi?id=947588\",\"syntax\":\"visible | hidden\"},\"-moz-osx-font-smoothing\":{\"comment\":\"misssed old syntax https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth\",\"syntax\":\"auto | grayscale\"},\"-moz-user-select\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/user-select\",\"syntax\":\"none | text | all | -moz-none\"},\"-ms-flex-align\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align\",\"syntax\":\"start | end | center | baseline | stretch\"},\"-ms-flex-item-align\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align\",\"syntax\":\"auto | start | end | center | baseline | stretch\"},\"-ms-flex-line-pack\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-line-pack\",\"syntax\":\"start | end | center | justify | distribute | stretch\"},\"-ms-flex-negative\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-shrink'>\"},\"-ms-flex-pack\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack\",\"syntax\":\"start | end | center | justify | distribute\"},\"-ms-flex-order\":{\"comment\":\"misssed old syntax implemented in IE; https://msdn.microsoft.com/en-us/library/jj127303(v=vs.85).aspx\",\"syntax\":\"<integer>\"},\"-ms-flex-positive\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-grow'>\"},\"-ms-flex-preferred-size\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-basis'>\"},\"-ms-interpolation-mode\":{\"comment\":\"https://msdn.microsoft.com/en-us/library/ff521095(v=vs.85).aspx\",\"syntax\":\"nearest-neighbor | bicubic\"},\"-ms-grid-column-align\":{\"comment\":\"add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466338.aspx\",\"syntax\":\"start | end | center | stretch\"},\"-ms-grid-row-align\":{\"comment\":\"add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466348.aspx\",\"syntax\":\"start | end | center | stretch\"},\"-ms-hyphenate-limit-last\":{\"comment\":\"misssed old syntax implemented in IE; https://www.w3.org/TR/css-text-4/#hyphenate-line-limits\",\"syntax\":\"none | always | column | page | spread\"},\"-webkit-appearance\":{\"comment\":\"webkit specific keywords\",\"references\":[\"http://css-infos.net/property/-webkit-appearance\"],\"syntax\":\"none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button\"},\"-webkit-background-clip\":{\"comment\":\"https://developer.mozilla.org/en/docs/Web/CSS/background-clip\",\"syntax\":\"[ <box> | border | padding | content | text ]#\"},\"-webkit-column-break-after\":{\"comment\":\"added, http://help.dottoro.com/lcrthhhv.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-column-break-before\":{\"comment\":\"added, http://help.dottoro.com/lcxquvkf.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-column-break-inside\":{\"comment\":\"added, http://help.dottoro.com/lclhnthl.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-font-smoothing\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth\",\"syntax\":\"auto | none | antialiased | subpixel-antialiased\"},\"-webkit-mask-box-image\":{\"comment\":\"missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image\",\"syntax\":\"[ <url> | <gradient> | none ] [ <length-percentage>{4} <-webkit-mask-box-repeat>{2} ]?\"},\"-webkit-print-color-adjust\":{\"comment\":\"missed\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/-webkit-print-color-adjust\"],\"syntax\":\"economy | exact\"},\"-webkit-text-security\":{\"comment\":\"missed; http://help.dottoro.com/lcbkewgt.php\",\"syntax\":\"none | circle | disc | square\"},\"-webkit-user-drag\":{\"comment\":\"missed; http://help.dottoro.com/lcbixvwm.php\",\"syntax\":\"none | element | auto\"},\"-webkit-user-select\":{\"comment\":\"auto is supported by old webkit, https://developer.mozilla.org/en-US/docs/Web/CSS/user-select\",\"syntax\":\"auto | none | text | all\"},\"alignment-baseline\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty\"],\"syntax\":\"auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical\"},\"baseline-shift\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#BaselineShiftProperty\"],\"syntax\":\"baseline | sub | super | <svg-length>\"},\"behavior\":{\"comment\":\"added old IE property https://msdn.microsoft.com/en-us/library/ms530723(v=vs.85).aspx\",\"syntax\":\"<url>+\"},\"clip-rule\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/masking.html#ClipRuleProperty\"],\"syntax\":\"nonzero | evenodd\"},\"content\":{\"comment\":\"https://www.w3.org/TR/css-content-3/#content-property\",\"syntax\":\"normal | none | [ <content-replacement> | <content-list> ] [/ [ <string> | <counter> ]+ ]?\"},\"counter-reset\":{\"comment\":\"<custom-ident> -> <counter-name>\",\"references\":[\"https://www.w3.org/TR/css-lists-3/#counter-reset\"],\"syntax\":\"[ <counter-name> <integer>? ]+ | none\"},\"counter-increment\":{\"comment\":\"<custom-ident> -> <counter-name>\",\"references\":[\"https://www.w3.org/TR/css-lists-3/#propdef-counter-increment\"],\"syntax\":\"[ <counter-name> <integer>? ]+ | none\"},\"counter-set\":{\"comment\":\"<custom-ident> -> <counter-name>\",\"references\":[\"https://www.w3.org/TR/css-lists-3/#propdef-counter-set\"],\"syntax\":\"[ <counter-name> <integer>? ]+ | none\"},\"cue\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'cue-before'> <'cue-after'>?\"},\"cue-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<url> <decibel>? | none\"},\"cue-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<url> <decibel>? | none\"},\"cursor\":{\"comment\":\"added legacy keywords: hand, -webkit-grab. -webkit-grabbing, -webkit-zoom-in, -webkit-zoom-out, -moz-grab, -moz-grabbing, -moz-zoom-in, -moz-zoom-out\",\"references\":[\"https://www.sitepoint.com/css3-cursor-styles/\"],\"syntax\":\"[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing | hand | -webkit-grab | -webkit-grabbing | -webkit-zoom-in | -webkit-zoom-out | -moz-grab | -moz-grabbing | -moz-zoom-in | -moz-zoom-out ] ]\"},\"display\":{\"comment\":\"extended with -ms-flexbox\",\"syntax\":\"| <-non-standard-display>\"},\"position\":{\"comment\":\"extended with -webkit-sticky\",\"syntax\":\"| -webkit-sticky\"},\"dominant-baseline\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#DominantBaselineProperty\"],\"syntax\":\"auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge\"},\"image-rendering\":{\"comment\":\"extended with <-non-standard-image-rendering>, added SVG keywords optimizeSpeed and optimizeQuality\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/image-rendering\",\"https://www.w3.org/TR/SVG/painting.html#ImageRenderingProperty\"],\"syntax\":\"| optimizeSpeed | optimizeQuality | <-non-standard-image-rendering>\"},\"fill\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"<paint>\"},\"fill-opacity\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"<number-zero-one>\"},\"fill-rule\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"nonzero | evenodd\"},\"filter\":{\"comment\":\"extend with IE legacy syntaxes\",\"syntax\":\"| <-ms-filter-function-list>\"},\"glyph-orientation-horizontal\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#GlyphOrientationHorizontalProperty\"],\"syntax\":\"<angle>\"},\"glyph-orientation-vertical\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#GlyphOrientationVerticalProperty\"],\"syntax\":\"<angle>\"},\"kerning\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#KerningProperty\"],\"syntax\":\"auto | <svg-length>\"},\"letter-spacing\":{\"comment\":\"fix syntax <length> -> <length-percentage>\",\"references\":[\"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/letter-spacing\"],\"syntax\":\"normal | <length-percentage>\"},\"marker\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-end\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-mid\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-start\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"max-width\":{\"comment\":\"extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/max-width\",\"syntax\":\"| <-non-standard-width>\"},\"width\":{\"references\":[\"https://developer.mozilla.org/en-US/docs/Web/CSS/width\",\"https://github.com/csstree/stylelint-validator/issues/29\"],\"syntax\":\"| fill | stretch | intrinsic | -moz-max-content | -webkit-max-content | -moz-fit-content | -webkit-fit-content\"},\"min-width\":{\"comment\":\"extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width\",\"syntax\":\"| <-non-standard-width>\"},\"overflow\":{\"comment\":\"extend by vendor keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow\",\"syntax\":\"| <-non-standard-overflow>\"},\"pause\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'pause-before'> <'pause-after'>?\"},\"pause-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"pause-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"rest\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'rest-before'> <'rest-after'>?\"},\"rest-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"rest-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"shape-rendering\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#ShapeRenderingPropert\"],\"syntax\":\"auto | optimizeSpeed | crispEdges | geometricPrecision\"},\"src\":{\"comment\":\"added @font-face's src property https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src\",\"syntax\":\"[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#\"},\"speak\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"auto | none | normal\"},\"speak-as\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"normal | spell-out || digits || [ literal-punctuation | no-punctuation ]\"},\"stroke\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<paint>\"},\"stroke-dasharray\":{\"comment\":\"added SVG property; a list of comma and/or white space separated <length>s and <percentage>s\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"none | [ <svg-length>+ ]#\"},\"stroke-dashoffset\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<svg-length>\"},\"stroke-linecap\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"butt | round | square\"},\"stroke-linejoin\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"miter | round | bevel\"},\"stroke-miterlimit\":{\"comment\":\"added SVG property (<miterlimit> = <number-one-or-greater>) \",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<number-one-or-greater>\"},\"stroke-opacity\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<number-zero-one>\"},\"stroke-width\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<svg-length>\"},\"text-anchor\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#TextAlignmentProperties\"],\"syntax\":\"start | middle | end\"},\"unicode-bidi\":{\"comment\":\"added prefixed keywords https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi\",\"syntax\":\"| -moz-isolate | -moz-isolate-override | -moz-plaintext | -webkit-isolate | -webkit-isolate-override | -webkit-plaintext\"},\"unicode-range\":{\"comment\":\"added missed property https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face/unicode-range\",\"syntax\":\"<urange>#\"},\"voice-balance\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<number> | left | center | right | leftwards | rightwards\"},\"voice-duration\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"auto | <time>\"},\"voice-family\":{\"comment\":\"<name> -> <family-name>, https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"[ [ <family-name> | <generic-voice> ] , ]* [ <family-name> | <generic-voice> ] | preserve\"},\"voice-pitch\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]\"},\"voice-range\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]\"},\"voice-rate\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"[ normal | x-slow | slow | medium | fast | x-fast ] || <percentage>\"},\"voice-stress\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"normal | strong | moderate | none | reduced\"},\"voice-volume\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"silent | [ [ x-soft | soft | medium | loud | x-loud ] || <decibel> ]\"},\"writing-mode\":{\"comment\":\"extend with SVG keywords\",\"syntax\":\"| <svg-writing-mode>\"}},\"syntaxes\":{\"-legacy-gradient\":{\"comment\":\"added collection of legacy gradient syntaxes\",\"syntax\":\"<-webkit-gradient()> | <-legacy-linear-gradient> | <-legacy-repeating-linear-gradient> | <-legacy-radial-gradient> | <-legacy-repeating-radial-gradient>\"},\"-legacy-linear-gradient\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"-moz-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-linear-gradient( <-legacy-linear-gradient-arguments> )\"},\"-legacy-repeating-linear-gradient\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )\"},\"-legacy-linear-gradient-arguments\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"[ <angle> | <side-or-corner> ]? , <color-stop-list>\"},\"-legacy-radial-gradient\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"-moz-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-radial-gradient( <-legacy-radial-gradient-arguments> )\"},\"-legacy-repeating-radial-gradient\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )\"},\"-legacy-radial-gradient-arguments\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"[ <position> , ]? [ [ [ <-legacy-radial-gradient-shape> || <-legacy-radial-gradient-size> ] | [ <length> | <percentage> ]{2} ] , ]? <color-stop-list>\"},\"-legacy-radial-gradient-size\":{\"comment\":\"before a standard it contains 2 extra keywords (`contain` and `cover`) https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltsize\",\"syntax\":\"closest-side | closest-corner | farthest-side | farthest-corner | contain | cover\"},\"-legacy-radial-gradient-shape\":{\"comment\":\"define to double sure it doesn't extends in future https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltshape\",\"syntax\":\"circle | ellipse\"},\"-non-standard-font\":{\"comment\":\"non standard fonts\",\"references\":[\"https://webkit.org/blog/3709/using-the-system-font-in-web-content/\"],\"syntax\":\"-apple-system-body | -apple-system-headline | -apple-system-subheadline | -apple-system-caption1 | -apple-system-caption2 | -apple-system-footnote | -apple-system-short-body | -apple-system-short-headline | -apple-system-short-subheadline | -apple-system-short-caption1 | -apple-system-short-footnote | -apple-system-tall-body\"},\"-non-standard-color\":{\"comment\":\"non standard colors\",\"references\":[\"http://cssdot.ru/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA_CSS/color-i305.html\",\"https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Mozilla_Color_Preference_Extensions\"],\"syntax\":\"-moz-ButtonDefault | -moz-ButtonHoverFace | -moz-ButtonHoverText | -moz-CellHighlight | -moz-CellHighlightText | -moz-Combobox | -moz-ComboboxText | -moz-Dialog | -moz-DialogText | -moz-dragtargetzone | -moz-EvenTreeRow | -moz-Field | -moz-FieldText | -moz-html-CellHighlight | -moz-html-CellHighlightText | -moz-mac-accentdarkestshadow | -moz-mac-accentdarkshadow | -moz-mac-accentface | -moz-mac-accentlightesthighlight | -moz-mac-accentlightshadow | -moz-mac-accentregularhighlight | -moz-mac-accentregularshadow | -moz-mac-chrome-active | -moz-mac-chrome-inactive | -moz-mac-focusring | -moz-mac-menuselect | -moz-mac-menushadow | -moz-mac-menutextselect | -moz-MenuHover | -moz-MenuHoverText | -moz-MenuBarText | -moz-MenuBarHoverText | -moz-nativehyperlinktext | -moz-OddTreeRow | -moz-win-communicationstext | -moz-win-mediatext | -moz-activehyperlinktext | -moz-default-background-color | -moz-default-color | -moz-hyperlinktext | -moz-visitedhyperlinktext | -webkit-activelink | -webkit-focus-ring-color | -webkit-link | -webkit-text\"},\"-non-standard-image-rendering\":{\"comment\":\"non-standard keywords http://phrogz.net/tmp/canvas_image_zoom.html\",\"syntax\":\"optimize-contrast | -moz-crisp-edges | -o-crisp-edges | -webkit-optimize-contrast\"},\"-non-standard-overflow\":{\"comment\":\"non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow\",\"syntax\":\"-moz-scrollbars-none | -moz-scrollbars-horizontal | -moz-scrollbars-vertical | -moz-hidden-unscrollable\"},\"-non-standard-width\":{\"comment\":\"non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width\",\"syntax\":\"fill-available | min-intrinsic | intrinsic | -moz-available | -moz-fit-content | -moz-min-content | -moz-max-content | -webkit-min-content | -webkit-max-content\"},\"-webkit-gradient()\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/ - TODO: simplify when after match algorithm improvement ( [, point, radius | , point] -> [, radius]? , point )\",\"syntax\":\"-webkit-gradient( <-webkit-gradient-type>, <-webkit-gradient-point> [, <-webkit-gradient-point> | , <-webkit-gradient-radius>, <-webkit-gradient-point> ] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )\"},\"-webkit-gradient-color-stop\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"from( <color> ) | color-stop( [ <number-zero-one> | <percentage> ] , <color> ) | to( <color> )\"},\"-webkit-gradient-point\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"[ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]\"},\"-webkit-gradient-radius\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"<length> | <percentage>\"},\"-webkit-gradient-type\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"linear | radial\"},\"-webkit-mask-box-repeat\":{\"comment\":\"missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image\",\"syntax\":\"repeat | stretch | round\"},\"-webkit-mask-clip-style\":{\"comment\":\"missed; there is no enough information about `-webkit-mask-clip` property, but looks like all those keywords are working\",\"syntax\":\"border | border-box | padding | padding-box | content | content-box | text\"},\"-ms-filter-function-list\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter\",\"syntax\":\"<-ms-filter-function>+\"},\"-ms-filter-function\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter\",\"syntax\":\"<-ms-filter-function-progid> | <-ms-filter-function-legacy>\"},\"-ms-filter-function-progid\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter\",\"syntax\":\"'progid:' [ <ident-token> '.' ]* [ <ident-token> | <function-token> <any-value>? ) ]\"},\"-ms-filter-function-legacy\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter\",\"syntax\":\"<ident-token> | <function-token> <any-value>? )\"},\"-ms-filter\":{\"syntax\":\"<string>\"},\"age\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"child | young | old\"},\"attr-name\":{\"syntax\":\"<wq-name>\"},\"attr-fallback\":{\"syntax\":\"<any-value>\"},\"border-radius\":{\"comment\":\"missed, https://drafts.csswg.org/css-backgrounds-3/#the-border-radius\",\"syntax\":\"<length-percentage>{1,2}\"},\"bottom\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"content-list\":{\"comment\":\"add missed <counter> -> https://drafts.csswg.org/css-content/#typedef-content-list\",\"syntax\":\"[ <string> | contents | <image> | <counter> | <quote> | <target> | <leader()> ]+\"},\"counter\":{\"comment\":\"missed\",\"syntax\":\"<counter()> | <counters()>\"},\"counter()\":{\"comment\":\"<custom-ident> -> <counter-name>\",\"references\":[\"https://www.w3.org/TR/css-lists-3/#counter-functions\"],\"syntax\":\"counter( <counter-name>, <counter-style>? )\"},\"counters()\":{\"comment\":\"<custom-ident> -> <counter-name>\",\"references\":[\"https://www.w3.org/TR/css-lists-3/#counter-functions\"],\"syntax\":\"counters( <counter-name>, <string>, <counter-style>? )\"},\"counter-name\":{\"comment\":\"missed\",\"syntax\":\"<custom-ident>\"},\"element()\":{\"comment\":\"https://drafts.csswg.org/css-gcpm/#element-syntax & https://drafts.csswg.org/css-images-4/#element-notation\",\"syntax\":\"element( <custom-ident> , [ first | start | last | first-except ]? ) | element( <id-selector> )\"},\"generic-voice\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"[ <age>? <gender> <integer>? ]\"},\"gender\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"male | female | neutral\"},\"generic-family\":{\"comment\":\"added -apple-system\",\"references\":[\"https://webkit.org/blog/3709/using-the-system-font-in-web-content/\"],\"syntax\":\"| -apple-system\"},\"gradient\":{\"comment\":\"added legacy syntaxes support\",\"syntax\":\"| <-legacy-gradient>\"},\"left\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"mask-image\":{\"comment\":\"missed; https://drafts.fxtf.org/css-masking-1/#the-mask-image\",\"syntax\":\"<mask-reference>#\"},\"name-repeat\":{\"comment\":\"missed, and looks like obsolete, keep it as is since other property syntaxes should be changed too; https://www.w3.org/TR/2015/WD-css-grid-1-20150917/#typedef-name-repeat\",\"syntax\":\"repeat( [ <positive-integer> | auto-fill ], <line-names>+)\"},\"named-color\":{\"comment\":\"added non standard color names\",\"syntax\":\"| <-non-standard-color>\"},\"paint\":{\"comment\":\"used by SVG https://www.w3.org/TR/SVG/painting.html#SpecifyingPaint\",\"syntax\":\"none | <color> | <url> [ none | <color> ]? | context-fill | context-stroke\"},\"ratio\":{\"comment\":\"missed, https://drafts.csswg.org/mediaqueries-4/#typedef-ratio\",\"syntax\":\"<integer> / <integer>\"},\"right\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"shape\":{\"comment\":\"missed spaces in function body and add backwards compatible syntax\",\"syntax\":\"rect( <top>, <right>, <bottom>, <left> ) | rect( <top> <right> <bottom> <left> )\"},\"svg-length\":{\"comment\":\"All coordinates and lengths in SVG can be specified with or without a unit identifier\",\"references\":[\"https://www.w3.org/TR/SVG11/coords.html#Units\"],\"syntax\":\"<percentage> | <length> | <number>\"},\"svg-writing-mode\":{\"comment\":\"SVG specific keywords (deprecated for CSS)\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/writing-mode\",\"https://www.w3.org/TR/SVG/text.html#WritingModeProperty\"],\"syntax\":\"lr-tb | rl-tb | tb-rl | lr | rl | tb\"},\"top\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"track-group\":{\"comment\":\"used by old grid-columns and grid-rows syntax v0\",\"syntax\":\"'(' [ <string>* <track-minmax> <string>* ]+ ')' [ '[' <positive-integer> ']' ]? | <track-minmax>\"},\"track-list-v0\":{\"comment\":\"used by old grid-columns and grid-rows syntax v0\",\"syntax\":\"[ <string>* <track-group> <string>* ]+ | none\"},\"track-minmax\":{\"comment\":\"used by old grid-columns and grid-rows syntax v0\",\"syntax\":\"minmax( <track-breadth> , <track-breadth> ) | auto | <track-breadth> | fit-content\"},\"x\":{\"comment\":\"missed; not sure we should add it, but no others except `cursor` is using it so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor\",\"syntax\":\"<number>\"},\"y\":{\"comment\":\"missed; not sure we should add it, but no others except `cursor` is using so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor\",\"syntax\":\"<number>\"},\"declaration\":{\"comment\":\"missed, restored by https://drafts.csswg.org/css-syntax\",\"syntax\":\"<ident-token> : <declaration-value>? [ '!' important ]?\"},\"declaration-list\":{\"comment\":\"missed, restored by https://drafts.csswg.org/css-syntax\",\"syntax\":\"[ <declaration>? ';' ]* <declaration>?\"},\"url\":{\"comment\":\"https://drafts.csswg.org/css-values-4/#urls\",\"syntax\":\"url( <string> <url-modifier>* ) | <url-token>\"},\"url-modifier\":{\"comment\":\"https://drafts.csswg.org/css-values-4/#typedef-url-modifier\",\"syntax\":\"<ident> | <function-token> <any-value> )\"},\"number-zero-one\":{\"syntax\":\"<number [0,1]>\"},\"number-one-or-greater\":{\"syntax\":\"<number [1,∞]>\"},\"positive-integer\":{\"syntax\":\"<integer [0,∞]>\"},\"-non-standard-display\":{\"syntax\":\"-ms-inline-flexbox | -ms-grid | -ms-inline-grid | -webkit-flex | -webkit-inline-flex | -webkit-box | -webkit-inline-box | -moz-inline-stack | -moz-box | -moz-inline-box\"}}}");

/***/ }),

/***/ 985:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"name\":\"css-tree\",\"version\":\"2.0.4\",\"description\":\"A tool set for CSS: fast detailed parser (CSS → AST), walker (AST traversal), generator (AST → CSS) and lexer (validation and matching) based on specs and browser implementations\",\"author\":\"Roman Dvornov <rdvornov@gmail.com> (https://github.com/lahmatiy)\",\"license\":\"MIT\",\"repository\":\"csstree/csstree\",\"keywords\":[\"css\",\"ast\",\"tokenizer\",\"parser\",\"walker\",\"lexer\",\"generator\",\"utils\",\"syntax\",\"validation\"],\"type\":\"module\",\"main\":\"./cjs/index.cjs\",\"exports\":{\".\":{\"import\":\"./lib/index.js\",\"require\":\"./cjs/index.cjs\"},\"./dist/*\":\"./dist/*.js\",\"./package.json\":\"./package.json\",\"./tokenizer\":{\"import\":\"./lib/tokenizer/index.js\",\"require\":\"./cjs/tokenizer/index.cjs\"},\"./parser\":{\"import\":\"./lib/parser/index.js\",\"require\":\"./cjs/parser/index.cjs\"},\"./generator\":{\"import\":\"./lib/generator/index.js\",\"require\":\"./cjs/generator/index.cjs\"},\"./walker\":{\"import\":\"./lib/walker/index.js\",\"require\":\"./cjs/walker/index.cjs\"},\"./lexer\":{\"import\":\"./lib/lexer/index.js\",\"require\":\"./cjs/lexer/index.cjs\"},\"./definition-syntax\":{\"import\":\"./lib/definition-syntax/index.js\",\"require\":\"./cjs/definition-syntax/index.cjs\"},\"./definition-syntax-data\":{\"import\":\"./lib/data.js\",\"require\":\"./cjs/data.cjs\"},\"./definition-syntax-data-patch\":{\"import\":\"./lib/data-patch.js\",\"require\":\"./cjs/data-patch.cjs\"},\"./utils\":{\"import\":\"./lib/utils/index.js\",\"require\":\"./cjs/utils/index.cjs\"}},\"browser\":{\"./cjs/data.cjs\":\"./dist/data.cjs\",\"./cjs/version.cjs\":\"./dist/version.cjs\",\"./lib/data.js\":\"./dist/data.js\",\"./lib/version.js\":\"./dist/version.js\"},\"unpkg\":\"dist/csstree.esm.js\",\"jsdelivr\":\"dist/csstree.esm.js\",\"scripts\":{\"build\":\"npm run bundle && npm run esm-to-cjs\",\"build-and-test\":\"npm run build && npm run test:dist && npm run test:cjs\",\"bundle\":\"node scripts/bundle\",\"bundle-and-test\":\"npm run bundle && npm run test:dist\",\"esm-to-cjs\":\"node scripts/esm-to-cjs.cjs\",\"esm-to-cjs-and-test\":\"npm run esm-to-cjs && npm run test:cjs\",\"lint\":\"eslint lib scripts && node scripts/review-syntax-patch --lint && node scripts/update-docs --lint\",\"lint-and-test\":\"npm run lint && npm test\",\"update:docs\":\"node scripts/update-docs\",\"review:syntax-patch\":\"node scripts/review-syntax-patch\",\"test\":\"mocha lib/__tests --reporter ${REPORTER:-progress}\",\"test:cjs\":\"mocha cjs/__tests --reporter ${REPORTER:-progress}\",\"test:dist\":\"mocha dist/__tests --reporter ${REPORTER:-progress}\",\"coverage\":\"c8 --exclude lib/__tests --reporter=lcovonly npm test\",\"prepublishOnly\":\"npm run lint-and-test && npm run build-and-test\",\"hydrogen\":\"node --trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions --redirect-code-traces --redirect-code-traces-to=code.asm --trace_hydrogen_file=code.cfg --print-opt-code bin/parse --stat -o /dev/null\"},\"dependencies\":{\"mdn-data\":\"2.0.23\",\"source-map-js\":\"^1.0.1\"},\"devDependencies\":{\"c8\":\"^7.7.1\",\"clap\":\"^2.0.1\",\"esbuild\":\"^0.14.1\",\"eslint\":\"^8.4.1\",\"json-to-ast\":\"^2.1.0\",\"mocha\":\"^9.1.2\",\"rollup\":\"^2.60.2\"},\"engines\":{\"node\":\"^10 || ^12.20.0 || ^14.13.0 || >=15.0.0\",\"npm\":\">=7.0.0\"},\"files\":[\"data\",\"dist\",\"cjs\",\"!cjs/__tests\",\"lib\",\"!lib/__tests\"]}");

/***/ }),

/***/ 6428:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"name\":\"csso\",\"version\":\"5.0.3\",\"description\":\"CSS minifier with structural optimisations\",\"author\":\"Sergey Kryzhanovsky <skryzhanovsky@ya.ru> (https://github.com/afelix)\",\"maintainers\":[{\"name\":\"Roman Dvornov\",\"email\":\"rdvornov@gmail.com\",\"github-username\":\"lahmatiy\"}],\"repository\":\"css/csso\",\"license\":\"MIT\",\"keywords\":[\"css\",\"compress\",\"minifier\",\"minify\",\"optimise\",\"optimisation\",\"csstree\"],\"type\":\"module\",\"unpkg\":\"dist/csso.esm.js\",\"jsdelivr\":\"dist/csso.esm.js\",\"browser\":{\"./cjs/version.cjs\":\"./dist/version.cjs\",\"./lib/version.js\":\"./dist/version.js\"},\"main\":\"./cjs/index.cjs\",\"module\":\"./lib/index.js\",\"exports\":{\".\":{\"import\":\"./lib/index.js\",\"require\":\"./cjs/index.cjs\"},\"./syntax\":{\"import\":\"./lib/syntax.js\",\"require\":\"./cjs/syntax.cjs\"},\"./dist/*\":\"./dist/*.js\",\"./package.json\":\"./package.json\"},\"scripts\":{\"test\":\"mocha test --reporter ${REPORTER:-progress}\",\"test:cjs\":\"mocha cjs-test --reporter ${REPORTER:-progress}\",\"test:dist\":\"mocha dist/test --reporter ${REPORTER:-progress}\",\"lint\":\"eslint lib scripts test\",\"lint-and-test\":\"npm run lint && npm test\",\"build\":\"npm run bundle && npm run esm-to-cjs\",\"build-and-test\":\"npm run build && npm run test:dist && npm run test:cjs\",\"bundle\":\"node scripts/bundle\",\"bundle-and-test\":\"npm run bundle && npm run test:dist\",\"esm-to-cjs\":\"node scripts/esm-to-cjs.cjs\",\"esm-to-cjs-and-test\":\"npm run esm-to-cjs && npm run test:cjs\",\"coverage\":\"c8 --reporter=lcovonly npm test\",\"prepublishOnly\":\"npm run lint-and-test && npm run build-and-test\",\"hydrogen\":\"node --trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions --redirect-code-traces --redirect-code-traces-to=code.asm --trace_hydrogen_file=code.cfg --print-opt-code bin/csso --stat -o /dev/null\"},\"dependencies\":{\"css-tree\":\"~2.0.4\"},\"devDependencies\":{\"c8\":\"^7.10.0\",\"esbuild\":\"^0.14.1\",\"eslint\":\"^7.24.0\",\"mocha\":\"^9.1.2\",\"rollup\":\"^2.60.2\",\"source-map-js\":\"^1.0.1\"},\"engines\":{\"node\":\"^10 || ^12.20.0 || ^14.13.0 || >=15.0.0\",\"npm\":\">=7.0.0\"},\"files\":[\"dist\",\"!dist/test\",\"cjs\",\"lib\"]}");

/***/ }),

/***/ 658:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"@charset\":{\"syntax\":\"@charset \\\"<charset>\\\";\",\"groups\":[\"CSS Charsets\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@charset\"},\"@counter-style\":{\"syntax\":\"@counter-style <counter-style-name> {\\n  [ system: <counter-system>; ] ||\\n  [ symbols: <counter-symbols>; ] ||\\n  [ additive-symbols: <additive-symbols>; ] ||\\n  [ negative: <negative-symbol>; ] ||\\n  [ prefix: <prefix>; ] ||\\n  [ suffix: <suffix>; ] ||\\n  [ range: <range>; ] ||\\n  [ pad: <padding>; ] ||\\n  [ speak-as: <speak-as>; ] ||\\n  [ fallback: <counter-style-name>; ]\\n}\",\"interfaces\":[\"CSSCounterStyleRule\"],\"groups\":[\"CSS Counter Styles\"],\"descriptors\":{\"additive-symbols\":{\"syntax\":\"[ <integer> && <symbol> ]#\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"fallback\":{\"syntax\":\"<counter-style-name>\",\"media\":\"all\",\"initial\":\"decimal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"negative\":{\"syntax\":\"<symbol> <symbol>?\",\"media\":\"all\",\"initial\":\"\\\"-\\\" hyphen-minus\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"pad\":{\"syntax\":\"<integer> && <symbol>\",\"media\":\"all\",\"initial\":\"0 \\\"\\\"\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"prefix\":{\"syntax\":\"<symbol>\",\"media\":\"all\",\"initial\":\"\\\"\\\"\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"range\":{\"syntax\":\"[ [ <integer> | infinite ]{2} ]# | auto\",\"media\":\"all\",\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"speak-as\":{\"syntax\":\"auto | bullets | numbers | words | spell-out | <counter-style-name>\",\"media\":\"all\",\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"suffix\":{\"syntax\":\"<symbol>\",\"media\":\"all\",\"initial\":\"\\\". \\\"\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"symbols\":{\"syntax\":\"<symbol>+\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"system\":{\"syntax\":\"cyclic | numeric | alphabetic | symbolic | additive | [ fixed <integer>? ] | [ extends <counter-style-name> ]\",\"media\":\"all\",\"initial\":\"symbolic\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"}},\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@counter-style\"},\"@document\":{\"syntax\":\"@document [ <url> | url-prefix(<string>) | domain(<string>) | media-document(<string>) | regexp(<string>) ]# {\\n  <group-rule-body>\\n}\",\"interfaces\":[\"CSSGroupingRule\",\"CSSConditionRule\"],\"groups\":[\"CSS Conditional Rules\"],\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@document\"},\"@font-face\":{\"syntax\":\"@font-face {\\n  [ font-family: <family-name>; ] ||\\n  [ src: <src>; ] ||\\n  [ unicode-range: <unicode-range>; ] ||\\n  [ font-variant: <font-variant>; ] ||\\n  [ font-feature-settings: <font-feature-settings>; ] ||\\n  [ font-variation-settings: <font-variation-settings>; ] ||\\n  [ font-stretch: <font-stretch>; ] ||\\n  [ font-weight: <font-weight>; ] ||\\n  [ font-style: <font-style>; ] ||\\n  [ size-adjust: <size-adjust>; ] ||\\n  [ ascent-override: <ascent-override>; ] ||\\n  [ descent-override: <descent-override>; ] ||\\n  [ line-gap-override: <line-gap-override>; ]\\n}\",\"interfaces\":[\"CSSFontFaceRule\"],\"groups\":[\"CSS Fonts\"],\"descriptors\":{\"ascent-override\":{\"syntax\":\"normal | <percentage>\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"asSpecified\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"experimental\"},\"descent-override\":{\"syntax\":\"normal | <percentage>\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"asSpecified\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"experimental\"},\"font-display\":{\"syntax\":\"[ auto | block | swap | fallback | optional ]\",\"media\":\"visual\",\"percentages\":\"no\",\"initial\":\"auto\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"font-family\":{\"syntax\":\"<family-name>\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font-feature-settings\":{\"syntax\":\"normal | <feature-tag-value>#\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"font-variation-settings\":{\"syntax\":\"normal | [ <string> <number> ]#\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"font-stretch\":{\"syntax\":\"<font-stretch-absolute>{1,2}\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font-style\":{\"syntax\":\"normal | italic | oblique <angle>{0,2}\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font-weight\":{\"syntax\":\"<font-weight-absolute>{1,2}\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font-variant\":{\"syntax\":\"normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic(<feature-value-name>) || historical-forms || styleset(<feature-value-name>#) || character-variant(<feature-value-name>#) || swash(<feature-value-name>) || ornaments(<feature-value-name>) || annotation(<feature-value-name>) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"line-gap-override\":{\"syntax\":\"normal | <percentage>\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"asSpecified\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"experimental\"},\"size-adjust\":{\"syntax\":\"<percentage>\",\"media\":\"all\",\"initial\":\"100%\",\"percentages\":\"asSpecified\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"experimental\"},\"src\":{\"syntax\":\"[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"unicode-range\":{\"syntax\":\"<unicode-range>#\",\"media\":\"all\",\"initial\":\"U+0-10FFFF\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"}},\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@font-face\"},\"@font-feature-values\":{\"syntax\":\"@font-feature-values <family-name># {\\n  <feature-value-block-list>\\n}\",\"interfaces\":[\"CSSFontFeatureValuesRule\"],\"groups\":[\"CSS Fonts\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@font-feature-values\"},\"@import\":{\"syntax\":\"@import [ <string> | <url> ] [ <media-query-list> ]?;\",\"groups\":[\"Media Queries\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@import\"},\"@keyframes\":{\"syntax\":\"@keyframes <keyframes-name> {\\n  <keyframe-block-list>\\n}\",\"interfaces\":[\"CSSKeyframeRule\",\"CSSKeyframesRule\"],\"groups\":[\"CSS Animations\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@keyframes\"},\"@media\":{\"syntax\":\"@media <media-query-list> {\\n  <group-rule-body>\\n}\",\"interfaces\":[\"CSSGroupingRule\",\"CSSConditionRule\",\"CSSMediaRule\",\"CSSCustomMediaRule\"],\"groups\":[\"CSS Conditional Rules\",\"Media Queries\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@media\"},\"@namespace\":{\"syntax\":\"@namespace <namespace-prefix>? [ <string> | <url> ];\",\"groups\":[\"CSS Namespaces\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@namespace\"},\"@page\":{\"syntax\":\"@page <page-selector-list> {\\n  <page-body>\\n}\",\"interfaces\":[\"CSSPageRule\"],\"groups\":[\"CSS Pages\"],\"descriptors\":{\"bleed\":{\"syntax\":\"auto | <length>\",\"media\":[\"visual\",\"paged\"],\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"marks\":{\"syntax\":\"none | [ crop || cross ]\",\"media\":[\"visual\",\"paged\"],\"initial\":\"none\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"size\":{\"syntax\":\"<length>{1,2} | auto | [ <page-size> || [ portrait | landscape ] ]\",\"media\":[\"visual\",\"paged\"],\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"}},\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@page\"},\"@property\":{\"syntax\":\"@property <custom-property-name> {\\n  <declaration-list>\\n}\",\"interfaces\":[\"CSS\",\"CSSPropertyRule\"],\"groups\":[\"CSS Houdini\"],\"descriptors\":{\"syntax\":{\"syntax\":\"<string>\",\"media\":\"all\",\"percentages\":\"no\",\"initial\":\"n/a (required)\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"inherits\":{\"syntax\":\"true | false\",\"media\":\"all\",\"percentages\":\"no\",\"initial\":\"auto\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"initial-value\":{\"syntax\":\"<string>\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"}},\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@property\"},\"@supports\":{\"syntax\":\"@supports <supports-condition> {\\n  <group-rule-body>\\n}\",\"interfaces\":[\"CSSGroupingRule\",\"CSSConditionRule\",\"CSSSupportsRule\"],\"groups\":[\"CSS Conditional Rules\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@supports\"},\"@viewport\":{\"syntax\":\"@viewport {\\n  <group-rule-body>\\n}\",\"interfaces\":[\"CSSViewportRule\"],\"groups\":[\"CSS Device Adaptation\"],\"descriptors\":{\"height\":{\"syntax\":\"<viewport-length>{1,2}\",\"media\":[\"visual\",\"continuous\"],\"initial\":[\"min-height\",\"max-height\"],\"percentages\":[\"min-height\",\"max-height\"],\"computed\":[\"min-height\",\"max-height\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"max-height\":{\"syntax\":\"<viewport-length>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToHeightOfInitialViewport\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"max-width\":{\"syntax\":\"<viewport-length>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToWidthOfInitialViewport\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"max-zoom\":{\"syntax\":\"auto | <number> | <percentage>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"the zoom factor itself\",\"computed\":\"autoNonNegativeOrPercentage\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-height\":{\"syntax\":\"<viewport-length>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToHeightOfInitialViewport\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-width\":{\"syntax\":\"<viewport-length>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToWidthOfInitialViewport\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-zoom\":{\"syntax\":\"auto | <number> | <percentage>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"the zoom factor itself\",\"computed\":\"autoNonNegativeOrPercentage\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"orientation\":{\"syntax\":\"auto | portrait | landscape\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToSizeOfBoundingBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"user-zoom\":{\"syntax\":\"zoom | fixed\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"zoom\",\"percentages\":\"referToSizeOfBoundingBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"viewport-fit\":{\"syntax\":\"auto | contain | cover\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"width\":{\"syntax\":\"<viewport-length>{1,2}\",\"media\":[\"visual\",\"continuous\"],\"initial\":[\"min-width\",\"max-width\"],\"percentages\":[\"min-width\",\"max-width\"],\"computed\":[\"min-width\",\"max-width\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"zoom\":{\"syntax\":\"auto | <number> | <percentage>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"the zoom factor itself\",\"computed\":\"autoNonNegativeOrPercentage\",\"order\":\"uniqueOrder\",\"status\":\"standard\"}},\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@viewport\"}}");

/***/ }),

/***/ 9149:
/***/ ((module) => {

"use strict";

/***/ }),

/***/ 2368:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"absolute-size\":{\"syntax\":\"xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large\"},\"alpha-value\":{\"syntax\":\"<number> | <percentage>\"},\"angle-percentage\":{\"syntax\":\"<angle> | <percentage>\"},\"angular-color-hint\":{\"syntax\":\"<angle-percentage>\"},\"angular-color-stop\":{\"syntax\":\"<color> && <color-stop-angle>?\"},\"angular-color-stop-list\":{\"syntax\":\"[ <angular-color-stop> [, <angular-color-hint>]? ]# , <angular-color-stop>\"},\"animateable-feature\":{\"syntax\":\"scroll-position | contents | <custom-ident>\"},\"attachment\":{\"syntax\":\"scroll | fixed | local\"},\"attr()\":{\"syntax\":\"attr( <attr-name> <type-or-unit>? [, <attr-fallback> ]? )\"},\"attr-matcher\":{\"syntax\":\"[ '~' | '|' | '^' | '$' | '*' ]? '='\"},\"attr-modifier\":{\"syntax\":\"i | s\"},\"attribute-selector\":{\"syntax\":\"'[' <wq-name> ']' | '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'\"},\"auto-repeat\":{\"syntax\":\"repeat( [ auto-fill | auto-fit ] , [ <line-names>? <fixed-size> ]+ <line-names>? )\"},\"auto-track-list\":{\"syntax\":\"[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>? <auto-repeat>\\n[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>?\"},\"baseline-position\":{\"syntax\":\"[ first | last ]? baseline\"},\"basic-shape\":{\"syntax\":\"<inset()> | <circle()> | <ellipse()> | <polygon()> | <path()>\"},\"bg-image\":{\"syntax\":\"none | <image>\"},\"bg-layer\":{\"syntax\":\"<bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>\"},\"bg-position\":{\"syntax\":\"[ [ left | center | right | top | bottom | <length-percentage> ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ] | [ center | [ left | right ] <length-percentage>? ] && [ center | [ top | bottom ] <length-percentage>? ] ]\"},\"bg-size\":{\"syntax\":\"[ <length-percentage> | auto ]{1,2} | cover | contain\"},\"blur()\":{\"syntax\":\"blur( <length> )\"},\"blend-mode\":{\"syntax\":\"normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity\"},\"box\":{\"syntax\":\"border-box | padding-box | content-box\"},\"brightness()\":{\"syntax\":\"brightness( <number-percentage> )\"},\"calc()\":{\"syntax\":\"calc( <calc-sum> )\"},\"calc-sum\":{\"syntax\":\"<calc-product> [ [ '+' | '-' ] <calc-product> ]*\"},\"calc-product\":{\"syntax\":\"<calc-value> [ '*' <calc-value> | '/' <number> ]*\"},\"calc-value\":{\"syntax\":\"<number> | <dimension> | <percentage> | ( <calc-sum> )\"},\"cf-final-image\":{\"syntax\":\"<image> | <color>\"},\"cf-mixing-image\":{\"syntax\":\"<percentage>? && <image>\"},\"circle()\":{\"syntax\":\"circle( [ <shape-radius> ]? [ at <position> ]? )\"},\"clamp()\":{\"syntax\":\"clamp( <calc-sum>#{3} )\"},\"class-selector\":{\"syntax\":\"'.' <ident-token>\"},\"clip-source\":{\"syntax\":\"<url>\"},\"color\":{\"syntax\":\"<rgb()> | <rgba()> | <hsl()> | <hsla()> | <hex-color> | <named-color> | currentcolor | <deprecated-system-color>\"},\"color-stop\":{\"syntax\":\"<color-stop-length> | <color-stop-angle>\"},\"color-stop-angle\":{\"syntax\":\"<angle-percentage>{1,2}\"},\"color-stop-length\":{\"syntax\":\"<length-percentage>{1,2}\"},\"color-stop-list\":{\"syntax\":\"[ <linear-color-stop> [, <linear-color-hint>]? ]# , <linear-color-stop>\"},\"combinator\":{\"syntax\":\"'>' | '+' | '~' | [ '||' ]\"},\"common-lig-values\":{\"syntax\":\"[ common-ligatures | no-common-ligatures ]\"},\"compat-auto\":{\"syntax\":\"searchfield | textarea | push-button | slider-horizontal | checkbox | radio | square-button | menulist | listbox | meter | progress-bar | button\"},\"composite-style\":{\"syntax\":\"clear | copy | source-over | source-in | source-out | source-atop | destination-over | destination-in | destination-out | destination-atop | xor\"},\"compositing-operator\":{\"syntax\":\"add | subtract | intersect | exclude\"},\"compound-selector\":{\"syntax\":\"[ <type-selector>? <subclass-selector>* [ <pseudo-element-selector> <pseudo-class-selector>* ]* ]!\"},\"compound-selector-list\":{\"syntax\":\"<compound-selector>#\"},\"complex-selector\":{\"syntax\":\"<compound-selector> [ <combinator>? <compound-selector> ]*\"},\"complex-selector-list\":{\"syntax\":\"<complex-selector>#\"},\"conic-gradient()\":{\"syntax\":\"conic-gradient( [ from <angle> ]? [ at <position> ]?, <angular-color-stop-list> )\"},\"contextual-alt-values\":{\"syntax\":\"[ contextual | no-contextual ]\"},\"content-distribution\":{\"syntax\":\"space-between | space-around | space-evenly | stretch\"},\"content-list\":{\"syntax\":\"[ <string> | contents | <image> | <quote> | <target> | <leader()> ]+\"},\"content-position\":{\"syntax\":\"center | start | end | flex-start | flex-end\"},\"content-replacement\":{\"syntax\":\"<image>\"},\"contrast()\":{\"syntax\":\"contrast( [ <number-percentage> ] )\"},\"counter()\":{\"syntax\":\"counter( <custom-ident>, <counter-style>? )\"},\"counter-style\":{\"syntax\":\"<counter-style-name> | symbols()\"},\"counter-style-name\":{\"syntax\":\"<custom-ident>\"},\"counters()\":{\"syntax\":\"counters( <custom-ident>, <string>, <counter-style>? )\"},\"cross-fade()\":{\"syntax\":\"cross-fade( <cf-mixing-image> , <cf-final-image>? )\"},\"cubic-bezier-timing-function\":{\"syntax\":\"ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number [0,1]>, <number>, <number [0,1]>, <number>)\"},\"deprecated-system-color\":{\"syntax\":\"ActiveBorder | ActiveCaption | AppWorkspace | Background | ButtonFace | ButtonHighlight | ButtonShadow | ButtonText | CaptionText | GrayText | Highlight | HighlightText | InactiveBorder | InactiveCaption | InactiveCaptionText | InfoBackground | InfoText | Menu | MenuText | Scrollbar | ThreeDDarkShadow | ThreeDFace | ThreeDHighlight | ThreeDLightShadow | ThreeDShadow | Window | WindowFrame | WindowText\"},\"discretionary-lig-values\":{\"syntax\":\"[ discretionary-ligatures | no-discretionary-ligatures ]\"},\"display-box\":{\"syntax\":\"contents | none\"},\"display-inside\":{\"syntax\":\"flow | flow-root | table | flex | grid | ruby\"},\"display-internal\":{\"syntax\":\"table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container\"},\"display-legacy\":{\"syntax\":\"inline-block | inline-list-item | inline-table | inline-flex | inline-grid\"},\"display-listitem\":{\"syntax\":\"<display-outside>? && [ flow | flow-root ]? && list-item\"},\"display-outside\":{\"syntax\":\"block | inline | run-in\"},\"drop-shadow()\":{\"syntax\":\"drop-shadow( <length>{2,3} <color>? )\"},\"east-asian-variant-values\":{\"syntax\":\"[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ]\"},\"east-asian-width-values\":{\"syntax\":\"[ full-width | proportional-width ]\"},\"element()\":{\"syntax\":\"element( <id-selector> )\"},\"ellipse()\":{\"syntax\":\"ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )\"},\"ending-shape\":{\"syntax\":\"circle | ellipse\"},\"env()\":{\"syntax\":\"env( <custom-ident> , <declaration-value>? )\"},\"explicit-track-list\":{\"syntax\":\"[ <line-names>? <track-size> ]+ <line-names>?\"},\"family-name\":{\"syntax\":\"<string> | <custom-ident>+\"},\"feature-tag-value\":{\"syntax\":\"<string> [ <integer> | on | off ]?\"},\"feature-type\":{\"syntax\":\"@stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation\"},\"feature-value-block\":{\"syntax\":\"<feature-type> '{' <feature-value-declaration-list> '}'\"},\"feature-value-block-list\":{\"syntax\":\"<feature-value-block>+\"},\"feature-value-declaration\":{\"syntax\":\"<custom-ident>: <integer>+;\"},\"feature-value-declaration-list\":{\"syntax\":\"<feature-value-declaration>\"},\"feature-value-name\":{\"syntax\":\"<custom-ident>\"},\"fill-rule\":{\"syntax\":\"nonzero | evenodd\"},\"filter-function\":{\"syntax\":\"<blur()> | <brightness()> | <contrast()> | <drop-shadow()> | <grayscale()> | <hue-rotate()> | <invert()> | <opacity()> | <saturate()> | <sepia()>\"},\"filter-function-list\":{\"syntax\":\"[ <filter-function> | <url> ]+\"},\"final-bg-layer\":{\"syntax\":\"<'background-color'> || <bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>\"},\"fit-content()\":{\"syntax\":\"fit-content( [ <length> | <percentage> ] )\"},\"fixed-breadth\":{\"syntax\":\"<length-percentage>\"},\"fixed-repeat\":{\"syntax\":\"repeat( [ <integer [1,∞]> ] , [ <line-names>? <fixed-size> ]+ <line-names>? )\"},\"fixed-size\":{\"syntax\":\"<fixed-breadth> | minmax( <fixed-breadth> , <track-breadth> ) | minmax( <inflexible-breadth> , <fixed-breadth> )\"},\"font-stretch-absolute\":{\"syntax\":\"normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | <percentage>\"},\"font-variant-css21\":{\"syntax\":\"[ normal | small-caps ]\"},\"font-weight-absolute\":{\"syntax\":\"normal | bold | <number [1,1000]>\"},\"frequency-percentage\":{\"syntax\":\"<frequency> | <percentage>\"},\"general-enclosed\":{\"syntax\":\"[ <function-token> <any-value> ) ] | ( <ident> <any-value> )\"},\"generic-family\":{\"syntax\":\"serif | sans-serif | cursive | fantasy | monospace\"},\"generic-name\":{\"syntax\":\"serif | sans-serif | cursive | fantasy | monospace\"},\"geometry-box\":{\"syntax\":\"<shape-box> | fill-box | stroke-box | view-box\"},\"gradient\":{\"syntax\":\"<linear-gradient()> | <repeating-linear-gradient()> | <radial-gradient()> | <repeating-radial-gradient()> | <conic-gradient()>\"},\"grayscale()\":{\"syntax\":\"grayscale( <number-percentage> )\"},\"grid-line\":{\"syntax\":\"auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]\"},\"historical-lig-values\":{\"syntax\":\"[ historical-ligatures | no-historical-ligatures ]\"},\"hsl()\":{\"syntax\":\"hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )\"},\"hsla()\":{\"syntax\":\"hsla( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsla( <hue>, <percentage>, <percentage>, <alpha-value>? )\"},\"hue\":{\"syntax\":\"<number> | <angle>\"},\"hue-rotate()\":{\"syntax\":\"hue-rotate( <angle> )\"},\"id-selector\":{\"syntax\":\"<hash-token>\"},\"image\":{\"syntax\":\"<url> | <image()> | <image-set()> | <element()> | <paint()> | <cross-fade()> | <gradient>\"},\"image()\":{\"syntax\":\"image( <image-tags>? [ <image-src>? , <color>? ]! )\"},\"image-set()\":{\"syntax\":\"image-set( <image-set-option># )\"},\"image-set-option\":{\"syntax\":\"[ <image> | <string> ] [ <resolution> || type(<string>) ]\"},\"image-src\":{\"syntax\":\"<url> | <string>\"},\"image-tags\":{\"syntax\":\"ltr | rtl\"},\"inflexible-breadth\":{\"syntax\":\"<length> | <percentage> | min-content | max-content | auto\"},\"inset()\":{\"syntax\":\"inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )\"},\"invert()\":{\"syntax\":\"invert( <number-percentage> )\"},\"keyframes-name\":{\"syntax\":\"<custom-ident> | <string>\"},\"keyframe-block\":{\"syntax\":\"<keyframe-selector># {\\n  <declaration-list>\\n}\"},\"keyframe-block-list\":{\"syntax\":\"<keyframe-block>+\"},\"keyframe-selector\":{\"syntax\":\"from | to | <percentage>\"},\"leader()\":{\"syntax\":\"leader( <leader-type> )\"},\"leader-type\":{\"syntax\":\"dotted | solid | space | <string>\"},\"length-percentage\":{\"syntax\":\"<length> | <percentage>\"},\"line-names\":{\"syntax\":\"'[' <custom-ident>* ']'\"},\"line-name-list\":{\"syntax\":\"[ <line-names> | <name-repeat> ]+\"},\"line-style\":{\"syntax\":\"none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset\"},\"line-width\":{\"syntax\":\"<length> | thin | medium | thick\"},\"linear-color-hint\":{\"syntax\":\"<length-percentage>\"},\"linear-color-stop\":{\"syntax\":\"<color> <color-stop-length>?\"},\"linear-gradient()\":{\"syntax\":\"linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )\"},\"mask-layer\":{\"syntax\":\"<mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || <geometry-box> || [ <geometry-box> | no-clip ] || <compositing-operator> || <masking-mode>\"},\"mask-position\":{\"syntax\":\"[ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?\"},\"mask-reference\":{\"syntax\":\"none | <image> | <mask-source>\"},\"mask-source\":{\"syntax\":\"<url>\"},\"masking-mode\":{\"syntax\":\"alpha | luminance | match-source\"},\"matrix()\":{\"syntax\":\"matrix( <number>#{6} )\"},\"matrix3d()\":{\"syntax\":\"matrix3d( <number>#{16} )\"},\"max()\":{\"syntax\":\"max( <calc-sum># )\"},\"media-and\":{\"syntax\":\"<media-in-parens> [ and <media-in-parens> ]+\"},\"media-condition\":{\"syntax\":\"<media-not> | <media-and> | <media-or> | <media-in-parens>\"},\"media-condition-without-or\":{\"syntax\":\"<media-not> | <media-and> | <media-in-parens>\"},\"media-feature\":{\"syntax\":\"( [ <mf-plain> | <mf-boolean> | <mf-range> ] )\"},\"media-in-parens\":{\"syntax\":\"( <media-condition> ) | <media-feature> | <general-enclosed>\"},\"media-not\":{\"syntax\":\"not <media-in-parens>\"},\"media-or\":{\"syntax\":\"<media-in-parens> [ or <media-in-parens> ]+\"},\"media-query\":{\"syntax\":\"<media-condition> | [ not | only ]? <media-type> [ and <media-condition-without-or> ]?\"},\"media-query-list\":{\"syntax\":\"<media-query>#\"},\"media-type\":{\"syntax\":\"<ident>\"},\"mf-boolean\":{\"syntax\":\"<mf-name>\"},\"mf-name\":{\"syntax\":\"<ident>\"},\"mf-plain\":{\"syntax\":\"<mf-name> : <mf-value>\"},\"mf-range\":{\"syntax\":\"<mf-name> [ '<' | '>' ]? '='? <mf-value>\\n| <mf-value> [ '<' | '>' ]? '='? <mf-name>\\n| <mf-value> '<' '='? <mf-name> '<' '='? <mf-value>\\n| <mf-value> '>' '='? <mf-name> '>' '='? <mf-value>\"},\"mf-value\":{\"syntax\":\"<number> | <dimension> | <ident> | <ratio>\"},\"min()\":{\"syntax\":\"min( <calc-sum># )\"},\"minmax()\":{\"syntax\":\"minmax( [ <length> | <percentage> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )\"},\"named-color\":{\"syntax\":\"transparent | aliceblue | antiquewhite | aqua | aquamarine | azure | beige | bisque | black | blanchedalmond | blue | blueviolet | brown | burlywood | cadetblue | chartreuse | chocolate | coral | cornflowerblue | cornsilk | crimson | cyan | darkblue | darkcyan | darkgoldenrod | darkgray | darkgreen | darkgrey | darkkhaki | darkmagenta | darkolivegreen | darkorange | darkorchid | darkred | darksalmon | darkseagreen | darkslateblue | darkslategray | darkslategrey | darkturquoise | darkviolet | deeppink | deepskyblue | dimgray | dimgrey | dodgerblue | firebrick | floralwhite | forestgreen | fuchsia | gainsboro | ghostwhite | gold | goldenrod | gray | green | greenyellow | grey | honeydew | hotpink | indianred | indigo | ivory | khaki | lavender | lavenderblush | lawngreen | lemonchiffon | lightblue | lightcoral | lightcyan | lightgoldenrodyellow | lightgray | lightgreen | lightgrey | lightpink | lightsalmon | lightseagreen | lightskyblue | lightslategray | lightslategrey | lightsteelblue | lightyellow | lime | limegreen | linen | magenta | maroon | mediumaquamarine | mediumblue | mediumorchid | mediumpurple | mediumseagreen | mediumslateblue | mediumspringgreen | mediumturquoise | mediumvioletred | midnightblue | mintcream | mistyrose | moccasin | navajowhite | navy | oldlace | olive | olivedrab | orange | orangered | orchid | palegoldenrod | palegreen | paleturquoise | palevioletred | papayawhip | peachpuff | peru | pink | plum | powderblue | purple | rebeccapurple | red | rosybrown | royalblue | saddlebrown | salmon | sandybrown | seagreen | seashell | sienna | silver | skyblue | slateblue | slategray | slategrey | snow | springgreen | steelblue | tan | teal | thistle | tomato | turquoise | violet | wheat | white | whitesmoke | yellow | yellowgreen\"},\"namespace-prefix\":{\"syntax\":\"<ident>\"},\"ns-prefix\":{\"syntax\":\"[ <ident-token> | '*' ]? '|'\"},\"number-percentage\":{\"syntax\":\"<number> | <percentage>\"},\"numeric-figure-values\":{\"syntax\":\"[ lining-nums | oldstyle-nums ]\"},\"numeric-fraction-values\":{\"syntax\":\"[ diagonal-fractions | stacked-fractions ]\"},\"numeric-spacing-values\":{\"syntax\":\"[ proportional-nums | tabular-nums ]\"},\"nth\":{\"syntax\":\"<an-plus-b> | even | odd\"},\"opacity()\":{\"syntax\":\"opacity( [ <number-percentage> ] )\"},\"overflow-position\":{\"syntax\":\"unsafe | safe\"},\"outline-radius\":{\"syntax\":\"<length> | <percentage>\"},\"page-body\":{\"syntax\":\"<declaration>? [ ; <page-body> ]? | <page-margin-box> <page-body>\"},\"page-margin-box\":{\"syntax\":\"<page-margin-box-type> '{' <declaration-list> '}'\"},\"page-margin-box-type\":{\"syntax\":\"@top-left-corner | @top-left | @top-center | @top-right | @top-right-corner | @bottom-left-corner | @bottom-left | @bottom-center | @bottom-right | @bottom-right-corner | @left-top | @left-middle | @left-bottom | @right-top | @right-middle | @right-bottom\"},\"page-selector-list\":{\"syntax\":\"[ <page-selector># ]?\"},\"page-selector\":{\"syntax\":\"<pseudo-page>+ | <ident> <pseudo-page>*\"},\"page-size\":{\"syntax\":\"A5 | A4 | A3 | B5 | B4 | JIS-B5 | JIS-B4 | letter | legal | ledger\"},\"path()\":{\"syntax\":\"path( [ <fill-rule>, ]? <string> )\"},\"paint()\":{\"syntax\":\"paint( <ident>, <declaration-value>? )\"},\"perspective()\":{\"syntax\":\"perspective( <length> )\"},\"polygon()\":{\"syntax\":\"polygon( <fill-rule>? , [ <length-percentage> <length-percentage> ]# )\"},\"position\":{\"syntax\":\"[ [ left | center | right ] || [ top | center | bottom ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]? | [ [ left | right ] <length-percentage> ] && [ [ top | bottom ] <length-percentage> ] ]\"},\"pseudo-class-selector\":{\"syntax\":\"':' <ident-token> | ':' <function-token> <any-value> ')'\"},\"pseudo-element-selector\":{\"syntax\":\"':' <pseudo-class-selector>\"},\"pseudo-page\":{\"syntax\":\": [ left | right | first | blank ]\"},\"quote\":{\"syntax\":\"open-quote | close-quote | no-open-quote | no-close-quote\"},\"radial-gradient()\":{\"syntax\":\"radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )\"},\"relative-selector\":{\"syntax\":\"<combinator>? <complex-selector>\"},\"relative-selector-list\":{\"syntax\":\"<relative-selector>#\"},\"relative-size\":{\"syntax\":\"larger | smaller\"},\"repeat-style\":{\"syntax\":\"repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}\"},\"repeating-linear-gradient()\":{\"syntax\":\"repeating-linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )\"},\"repeating-radial-gradient()\":{\"syntax\":\"repeating-radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )\"},\"rgb()\":{\"syntax\":\"rgb( <percentage>{3} [ / <alpha-value> ]? ) | rgb( <number>{3} [ / <alpha-value> ]? ) | rgb( <percentage>#{3} , <alpha-value>? ) | rgb( <number>#{3} , <alpha-value>? )\"},\"rgba()\":{\"syntax\":\"rgba( <percentage>{3} [ / <alpha-value> ]? ) | rgba( <number>{3} [ / <alpha-value> ]? ) | rgba( <percentage>#{3} , <alpha-value>? ) | rgba( <number>#{3} , <alpha-value>? )\"},\"rotate()\":{\"syntax\":\"rotate( [ <angle> | <zero> ] )\"},\"rotate3d()\":{\"syntax\":\"rotate3d( <number> , <number> , <number> , [ <angle> | <zero> ] )\"},\"rotateX()\":{\"syntax\":\"rotateX( [ <angle> | <zero> ] )\"},\"rotateY()\":{\"syntax\":\"rotateY( [ <angle> | <zero> ] )\"},\"rotateZ()\":{\"syntax\":\"rotateZ( [ <angle> | <zero> ] )\"},\"saturate()\":{\"syntax\":\"saturate( <number-percentage> )\"},\"scale()\":{\"syntax\":\"scale( <number> , <number>? )\"},\"scale3d()\":{\"syntax\":\"scale3d( <number> , <number> , <number> )\"},\"scaleX()\":{\"syntax\":\"scaleX( <number> )\"},\"scaleY()\":{\"syntax\":\"scaleY( <number> )\"},\"scaleZ()\":{\"syntax\":\"scaleZ( <number> )\"},\"self-position\":{\"syntax\":\"center | start | end | self-start | self-end | flex-start | flex-end\"},\"shape-radius\":{\"syntax\":\"<length-percentage> | closest-side | farthest-side\"},\"skew()\":{\"syntax\":\"skew( [ <angle> | <zero> ] , [ <angle> | <zero> ]? )\"},\"skewX()\":{\"syntax\":\"skewX( [ <angle> | <zero> ] )\"},\"skewY()\":{\"syntax\":\"skewY( [ <angle> | <zero> ] )\"},\"sepia()\":{\"syntax\":\"sepia( <number-percentage> )\"},\"shadow\":{\"syntax\":\"inset? && <length>{2,4} && <color>?\"},\"shadow-t\":{\"syntax\":\"[ <length>{2,3} && <color>? ]\"},\"shape\":{\"syntax\":\"rect(<top>, <right>, <bottom>, <left>)\"},\"shape-box\":{\"syntax\":\"<box> | margin-box\"},\"side-or-corner\":{\"syntax\":\"[ left | right ] || [ top | bottom ]\"},\"single-animation\":{\"syntax\":\"<time> || <easing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> || [ none | <keyframes-name> ]\"},\"single-animation-direction\":{\"syntax\":\"normal | reverse | alternate | alternate-reverse\"},\"single-animation-fill-mode\":{\"syntax\":\"none | forwards | backwards | both\"},\"single-animation-iteration-count\":{\"syntax\":\"infinite | <number>\"},\"single-animation-play-state\":{\"syntax\":\"running | paused\"},\"single-transition\":{\"syntax\":\"[ none | <single-transition-property> ] || <time> || <easing-function> || <time>\"},\"single-transition-property\":{\"syntax\":\"all | <custom-ident>\"},\"size\":{\"syntax\":\"closest-side | farthest-side | closest-corner | farthest-corner | <length> | <length-percentage>{2}\"},\"step-position\":{\"syntax\":\"jump-start | jump-end | jump-none | jump-both | start | end\"},\"step-timing-function\":{\"syntax\":\"step-start | step-end | steps(<integer>[, <step-position>]?)\"},\"subclass-selector\":{\"syntax\":\"<id-selector> | <class-selector> | <attribute-selector> | <pseudo-class-selector>\"},\"supports-condition\":{\"syntax\":\"not <supports-in-parens> | <supports-in-parens> [ and <supports-in-parens> ]* | <supports-in-parens> [ or <supports-in-parens> ]*\"},\"supports-in-parens\":{\"syntax\":\"( <supports-condition> ) | <supports-feature> | <general-enclosed>\"},\"supports-feature\":{\"syntax\":\"<supports-decl> | <supports-selector-fn>\"},\"supports-decl\":{\"syntax\":\"( <declaration> )\"},\"supports-selector-fn\":{\"syntax\":\"selector( <complex-selector> )\"},\"symbol\":{\"syntax\":\"<string> | <image> | <custom-ident>\"},\"target\":{\"syntax\":\"<target-counter()> | <target-counters()> | <target-text()>\"},\"target-counter()\":{\"syntax\":\"target-counter( [ <string> | <url> ] , <custom-ident> , <counter-style>? )\"},\"target-counters()\":{\"syntax\":\"target-counters( [ <string> | <url> ] , <custom-ident> , <string> , <counter-style>? )\"},\"target-text()\":{\"syntax\":\"target-text( [ <string> | <url> ] , [ content | before | after | first-letter ]? )\"},\"time-percentage\":{\"syntax\":\"<time> | <percentage>\"},\"easing-function\":{\"syntax\":\"linear | <cubic-bezier-timing-function> | <step-timing-function>\"},\"track-breadth\":{\"syntax\":\"<length-percentage> | <flex> | min-content | max-content | auto\"},\"track-list\":{\"syntax\":\"[ <line-names>? [ <track-size> | <track-repeat> ] ]+ <line-names>?\"},\"track-repeat\":{\"syntax\":\"repeat( [ <integer [1,∞]> ] , [ <line-names>? <track-size> ]+ <line-names>? )\"},\"track-size\":{\"syntax\":\"<track-breadth> | minmax( <inflexible-breadth> , <track-breadth> ) | fit-content( [ <length> | <percentage> ] )\"},\"transform-function\":{\"syntax\":\"<matrix()> | <translate()> | <translateX()> | <translateY()> | <scale()> | <scaleX()> | <scaleY()> | <rotate()> | <skew()> | <skewX()> | <skewY()> | <matrix3d()> | <translate3d()> | <translateZ()> | <scale3d()> | <scaleZ()> | <rotate3d()> | <rotateX()> | <rotateY()> | <rotateZ()> | <perspective()>\"},\"transform-list\":{\"syntax\":\"<transform-function>+\"},\"translate()\":{\"syntax\":\"translate( <length-percentage> , <length-percentage>? )\"},\"translate3d()\":{\"syntax\":\"translate3d( <length-percentage> , <length-percentage> , <length> )\"},\"translateX()\":{\"syntax\":\"translateX( <length-percentage> )\"},\"translateY()\":{\"syntax\":\"translateY( <length-percentage> )\"},\"translateZ()\":{\"syntax\":\"translateZ( <length> )\"},\"type-or-unit\":{\"syntax\":\"string | color | url | integer | number | length | angle | time | frequency | cap | ch | em | ex | ic | lh | rlh | rem | vb | vi | vw | vh | vmin | vmax | mm | Q | cm | in | pt | pc | px | deg | grad | rad | turn | ms | s | Hz | kHz | %\"},\"type-selector\":{\"syntax\":\"<wq-name> | <ns-prefix>? '*'\"},\"var()\":{\"syntax\":\"var( <custom-property-name> , <declaration-value>? )\"},\"viewport-length\":{\"syntax\":\"auto | <length-percentage>\"},\"visual-box\":{\"syntax\":\"content-box | padding-box | border-box\"},\"wq-name\":{\"syntax\":\"<ns-prefix>? <ident-token>\"}}");

/***/ }),

/***/ 2069:
/***/ ((module) => {

"use strict";

/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 5338:
/***/ ((module) => {

"use strict";
module.exports = require("canvas");

/***/ }),

/***/ 3129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3819:
/***/ ((module) => {

"use strict";
module.exports = require("gifsicle");

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1631:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 4213:
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4016:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(2178);
/******/ })()
;