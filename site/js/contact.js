const email = ['hello', 'example.com'].join('@');
const button = document.querySelector('#copy-email');
const status = document.querySelector('#email-status');
let resetTimer;

button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    clearTimeout(resetTimer);
    button.classList.add('is-copied');
    status.classList.add('visually-hidden');
    status.textContent = 'E-mail copied to clipboard.';
    resetTimer = setTimeout(() => {
      button.classList.remove('is-copied');
      status.textContent = '';
    }, 3000);
  } catch {
    clearTimeout(resetTimer);
    button.classList.remove('is-copied');
    status.classList.remove('visually-hidden');
    status.textContent = `Unable to copy. You can reach me at ${email}`;
  }
});
