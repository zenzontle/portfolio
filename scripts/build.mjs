import { cp, readFile, rm, writeFile } from 'node:fs/promises';

const user = process.env.EMAIL_USER?.trim();
const domain = process.env.EMAIL_DOMAIN?.trim();
const emailParts = user && domain ? [user, domain] : ['hello', 'example.com'];

if (emailParts.some((part) => /[\s@]/.test(part))) {
  throw new Error('Email parts must not contain spaces or @.');
}

const source = new URL('../site/', import.meta.url);
const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });
const contactSource = await readFile(new URL('js/contact.js', source), 'utf8');
await writeFile(
  new URL('js/contact.js', output),
  contactSource.replace("['hello', 'example.com']", () => JSON.stringify(emailParts)),
);
console.log('Static site built in dist/');
