import { describe, expect, test } from '@jest/globals';
import { UrlAddress } from './UrlAddress.type';

describe(`Testing valid URLs`, () => {
	const arrayOfValidURL = [
		{ value: 'http://www.uol.com.br' }
		, { value: 'http://WWW.UOL.COM.BR' }
		, { value: 'https://github.com/rtsarakaki' }
		, { value: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' }
		, { value: 'https://www.appsheet.com/start/45905956-943e-4f1c-814b-c513d3489427?platform=desktop#viewStack[0][identifier][Type]=Control&viewStack[0][identifier][Name]=view_principal&appName=Workplace-876599309&searchTerm=aprova&tableNameToFilterOn=tb_conteudo%20to%20view_principal' }
		, { value: 'ftp://ftp.server.com/file-to-download.pdf' }
		, { value: 'http://www.example.com' }
		, { value: 'https://www.example.com' }
		, { value: 'ftp://ftp.example.com' }
		, { value: 'sftp://sftp.example.com' }
		, { value: 'ssh://ssh.example.com' }
		, { value: 'telnet://telnet.example.com' }
		, { value: 'file:///path/to/file.txt' }
		, { value: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D' }
		, { value: 'mail://mail.server.com' }
		, { value: 'mail://ftp.server.com' }
		, { value: 'ftp.server.com' }
		, { value: 'http://www.example.com:8080/path/to/resource?param1=value1&param2=value2#fragment' }
		, { value: 'https://www.example.com/path/to/resource?param1=value1&param2=value2#fragment' }
		, { value: 'ftp://ftp.example.com/path/to/file.txt' }
		, { value: 'sftp://sftp.example.com/path/to/file.txt' }
		, { value: 'file:///C:/path/to/file.txt' }
		, { value: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D' }
		, { value: 'mailto:email@example.com?subject=Assunto&body=Corpo%20do%20e-mail' }
		, { value: 'www.example.com:8080/path/to/resource?param1=value1&param2=value2#fragment' }
		, { value: 'www.example.com/path/to/resource?param1=value1&param2=value2#fragment' }
		, { value: 'ftp.example.com/path/to/file.txt' }
		, { value: 'sftp.example.com/path/to/file.txt' }
		, { value: 'text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D' }
		, { value: 'email@example.com?subject=Assunto&body=Corpo%20do%20e-mail' }
		, { value: 'mailto:john.doe:password@example.com' }
		, { value: 'username:secret123@example.com' }
		, { value: 'mailto:admin:mysecretpassword@example.com' }
		, { value: 'ftp://ftp.server.com/user:password@ftp.server.com/file-to-download.pdf' }
		, { value: 'sftp://sftp.server.com/user:password@sftp.server.com/file-to-download.pdf' }
	]

	describe.each(arrayOfValidURL)(`$value is valid URL.`, ({ value }) => {
		const result = new UrlAddress(value)
		test(`No errors found validating $value`, () => {
			expect(result.errors.length).toEqual(0)
		})

		if (result.errors.length > 0) {
			test.each(result.errors)(`%p`, (error) => {
				const result = true
				expect(result).toBeTruthy()
			});
		}

	});
});

describe(`Testing invalid URLs`, () => {
	const arrayOfInvalidURL = [
		{ value: 'http://www.example.com :8080/path/to/resource?param1=value1&param2=value2#fragment#' }
		, { value: 'ftp://sftp.server.com/file-to-download.pdf' }
		, { value: 'sftp://ftp.server.com/file-to-download.pdf' }
		, { value: 'http://www.example.com/path with spaces' }
		, { value: 'http://www.example.com/path/with<invalid>characters' }
		, { value: null }
		, { value: undefined }
		, { value: 1 }
	];

	describe.each(arrayOfInvalidURL)(`$value is invalid URL`, ({ value }) => {
		const result = new UrlAddress(value as string);
		
		test(`${result.errors.length} errors found validating $value`, () => {
			expect(result.errors.length).toBeGreaterThan(0);
		})

		if (result.errors.length > 0) {
			test.each(result.errors)(`%p`, (error) => {
				const result = true
				expect(result).toBeTruthy()
			});
		}
	});


});