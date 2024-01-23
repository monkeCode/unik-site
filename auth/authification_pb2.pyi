from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class LoginRequest(_message.Message):
    __slots__ = ("login", "password")
    LOGIN_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    login: str
    password: str
    def __init__(self, login: _Optional[str] = ..., password: _Optional[str] = ...) -> None: ...

class RegisterRequest(_message.Message):
    __slots__ = ("login", "password", "email", "type")
    LOGIN_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    TYPE_FIELD_NUMBER: _ClassVar[int]
    login: str
    password: str
    email: str
    type: str
    def __init__(self, login: _Optional[str] = ..., password: _Optional[str] = ..., email: _Optional[str] = ..., type: _Optional[str] = ...) -> None: ...

class KeyMessage(_message.Message):
    __slots__ = ("key",)
    KEY_FIELD_NUMBER: _ClassVar[int]
    key: str
    def __init__(self, key: _Optional[str] = ...) -> None: ...

class UserReply(_message.Message):
    __slots__ = ("id", "email", "type")
    ID_FIELD_NUMBER: _ClassVar[int]
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    TYPE_FIELD_NUMBER: _ClassVar[int]
    id: int
    email: str
    type: str
    def __init__(self, id: _Optional[int] = ..., email: _Optional[str] = ..., type: _Optional[str] = ...) -> None: ...
