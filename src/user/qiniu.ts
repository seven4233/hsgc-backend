import * as qiniu from 'qiniu'

const AK = 'BnRxcSQzqCwIX7_slRuIGBpHqVYRhre_99e_ceu0'
const SK = '62lho5oES_DaxkTUx11bxStRBp3kRL26KFFJvxlB'

const bucket = "seven4233"
const mac = new qiniu.auth.digest.Mac(AK, SK)

const options = {
    scope: bucket,
    expires: 3600 * 24,
    returnBody:'{"key": "${key}", "hash":"${hash}", "name": "${x:name}"}'
}

const putPolicy = new qiniu.rs.PutPolicy(options)

export { putPolicy, mac }