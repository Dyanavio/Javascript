const base64 = new Base64();

QUnit.module('Base64', (hooks) => {

  QUnit.test('encoder', (assert) => {
    assert.equal(base64.createCredentials('Aladdin', 'open sesame'), 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==');
    assert.equal(base64.createCredentials('Rohan', 'Kishibe64534'), 'Um9oYW46S2lzaGliZTY0NTM0');
    assert.equal(base64.createCredentials('Beowulf', 'Dra:gon'), 'QmVvd3VsZjpEcmE6Z29u');
    assert.equal(base64.createCredentials('TomorrowCorporation', 'Seven:Billion:Humans'), 'VG9tb3Jyb3dDb3Jwb3JhdGlvbjpTZXZlbjpCaWxsaW9uOkh1bWFucw==');
    assert.throws(function() { base64.createCredentials('Alad:din', 'open sesame') }, "User-id must not contain single colon ':'");

    assert.equal(JSON.stringify(base64.divideCredentials('QWxhZGRpbjpvcGVuIHNlc2FtZQ==')), JSON.stringify({"user-id" : 'Aladdin', "password" : 'open sesame'}));
    assert.equal(JSON.stringify(base64.divideCredentials('Um9oYW46S2lzaGliZTY0NTM0')), JSON.stringify({"user-id" : 'Rohan', "password" : 'Kishibe64534'}));
    assert.equal(JSON.stringify(base64.divideCredentials('QmVvd3VsZjpEcmE6Z29u')), JSON.stringify({"user-id" : 'Beowulf', "password" : 'Dra:gon'}));
    assert.equal(JSON.stringify(base64.divideCredentials('VG9tb3Jyb3dDb3Jwb3JhdGlvbjpTZXZlbjpCaWxsaW9uOkh1bWFucw==')), JSON.stringify({"user-id" : 'TomorrowCorporation', "password" : 'Seven:Billion:Humans'}));
  });
});