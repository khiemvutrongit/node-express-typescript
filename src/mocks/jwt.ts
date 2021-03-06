import { SignOptions } from "jsonwebtoken";

export const payload = {
  acc: '615989459035e9a70614717b',
  permissions: "mp:r mp:c",
  email: 'test@gmail.com'
}

export const signOptions: SignOptions = {
  expiresIn: "15m",
  algorithm: "RS256"
};

export const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+As6P+T6552dUkLE6q8p
YXNMK4X2g7fdn7xXDh7Ur8565W1oSIocMyM5f6lEY/o9NBmYHu56/la6eqT3dcd9
ORfe/UCpiDy6Nnad8G/SgaYltIEYVTtZ40BXUUiTmxnD76wXcGe4pxSndHJWpYeV
HNI9LUkQFJELjtpsvbnuhkmT/qWyYksmVd4lDVGAJlTNJkAB8OB/bnJStURaeCWC
ppIs2ZxnezU3MCnqBe/RjNNA2U9Qp+jW0d5t6SvA9C4tjsVjA/4eWOMHUu4oFgUV
6TLibFEmDKXClYQYAlkHhQ/gty/2cycyqf2Z3U8gG4Sv3vR4Z40jbZm6kU90KzQ7
vwIDAQAB
-----END PUBLIC KEY-----`

export const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA+As6P+T6552dUkLE6q8pYXNMK4X2g7fdn7xXDh7Ur8565W1o
SIocMyM5f6lEY/o9NBmYHu56/la6eqT3dcd9ORfe/UCpiDy6Nnad8G/SgaYltIEY
VTtZ40BXUUiTmxnD76wXcGe4pxSndHJWpYeVHNI9LUkQFJELjtpsvbnuhkmT/qWy
YksmVd4lDVGAJlTNJkAB8OB/bnJStURaeCWCppIs2ZxnezU3MCnqBe/RjNNA2U9Q
p+jW0d5t6SvA9C4tjsVjA/4eWOMHUu4oFgUV6TLibFEmDKXClYQYAlkHhQ/gty/2
cycyqf2Z3U8gG4Sv3vR4Z40jbZm6kU90KzQ7vwIDAQABAoIBAQD0fmSpTHSAz1ye
FBBz37pjQznmgMKvrRH4fLY2xe8RZ+69rO0o63HGekcX7enqvmOLslq+yoVTpHtl
nqwJXVyyZTQ43378Ohe2zY76y85sWzA5TzKD+N+uX+JxzZ8pN+lpmnD0LFjX4ET7
RCTiPtWdNiJ1O9ps21fQNL8Q+HADzhwaRUPLcueqdTRLPaibDhhLVupfN1IIqkwW
NO5j+xcCZuNi1SZ2wueS6bEn08j0RxAw8SdWQnNTe/jc3LfcfhPWdxIYcNU1cPWS
+fLvtn+N5+MPLHnTVTWd5pENNeIftgnB9LdBF62V6FHklkDd0pIl9NQcI20SJ67e
Z8dzA/PZAoGBAP0IFwy4Y64P0U8sw5lklv+1FmqU6GZS6+eNWa9ht+6AKuglfYZl
05cwdvNxeLhy28IDXQ/EBgwygsdafj5ViAg2hpz85W+SthuV5D2Cou+Ua7wS36xp
8Q5NKVeOdtf1oTMHFKkJ8kKbbnKPgZDhA65bEcF4dm6jslF5QcWBQIC1AoGBAPr0
KH+4T3/ssOWdt095Tvx87G3Iqj/rmazi/2VbSiR1GWjxCU3RdKNAyvNO+M0Njgxq
JFPkBHxc+2fwp4oKmlXJAJLOGiV7ZAdtcxWYLUJ6ZWWX3Wm0lyEVeVZzHnPPpY0P
sbGoUP8T8/2VMLOmvbvRQOqpdEwjSM2Knlxa5PcjAoGAYXXrQugG5PWMvn1UfdHj
42xBzR28AiWwXcjxIX93FDNj03UVS14PSO3O82figtEi2jDneHodhjcybkzp0WKq
eddetDsouHf/EtMCTbryvWsisBdo9gT8Z3DLGsFx/y7KP1hb2dxN5t/tg8zIsCAr
hc3oIegfXfBJb95Puh5V1P0CgYAKr/E1lzzTftn9vVy8Jrdla1CKUFxnwnnV8gjc
YSnkKZR+cp1p0fy8oxrBh+ByoxwkjTSk2fYS8cbHI2mPKGpwMtIyblKQvBODeXbI
OaXbyeidjf0g7k7tWsPDGb33QqWTP1La9QcWBdyDNSJQ1E4KPJweIj9QqsQD9N5P
opNTrwKBgQDfprx5IDSN95CIHUUmdHJXoiUgX6YDLDSgOmKayIxT/hH/mV5aR7ly
wvy7ZebYRM9xkcJxRNGTbUYJx5iQLNT9REzaga1dK0ZMpQzpajeEBnt1mNum7PrM
dx1Ps4gbrEpPa/Eokm8kAGmci9Nv8rawmL1km3Q3B8GBvhV5cH5gdg==
-----END RSA PRIVATE KEY-----`