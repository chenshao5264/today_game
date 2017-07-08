"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./../../config");
const socket_service_1 = require("./../common/socket_service");
const socket_delegate_1 = require("./socket_delegate");
socket_service_1.socket_service.start(config_1.login_server(), socket_delegate_1.socket_delegate);