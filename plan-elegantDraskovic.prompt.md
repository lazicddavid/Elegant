## Plan: Implement Serbian Elegant Draskovic Website

TL;DR: Replace the starter Vite files with a polished Serbian real estate landing page that includes a blurred-hero logo background, sections for `prodaja`, `izdavanje`, `događaji`, and footer contact details, plus responsive styling and minimal JavaScript filtering.

Steps
1. Update `index.html`:
   - Set `lang="sr"` and include the brand title in Serbian.
   - Add a sticky navbar with anchors: Početna, Prodaja, Izdavanje, Događaji, Kontakt.
   - Build a hero section with a blurred logo or glowing overlay behind the heading.
   - Add a `prodaja` section with featured sale property cards.
   - Add an `izdavanje` section with rental property cards.
   - Add a `događaji` section for upcoming open houses / events.
   - Add a footer with contact info, email, phone, and quick links.
2. Update `style.css`:
   - Add global reset, body background, and font styling.
   - Style the hero with dark gradient, gold accents, and a blurred logo effect.
   - Style section headers, cards, buttons, and the footer.
   - Add responsive breakpoints for tablet and mobile.
   - Ensure the site follows the requested elegant black/gold/blue palette.
3. Update `script.js`:
   - Add search/filter behavior for property cards.
   - Add click highlight or selection effect on cards.
   - Add a contact form submit handler with a confirmation alert.
4. Verify changes:
   - Run `npm run dev` and confirm the site loads without errors.
   - Check that navbar anchor links scroll to the correct sections.
   - Review `prodaja`, `izdavanje`, and `događaji` sections on desktop and mobile.
   - Verify the footer contact details are visible.

Relevant files
- `c:\Users\lazic\Desktop\Elegant\index.html`
- `c:\Users\lazic\Desktop\Elegant\style.css`
- `c:\Users\lazic\Desktop\Elegant\script.js`

Current repository state
- `index.html` is boilerplate with only an empty body.
- `style.css` has partial starter styles.
- `script.js` is empty.
- `package.json` already defines Vite scripts.

Verification
1. Open the Vite app at the local dev server after `npm run dev`.
2. Confirm hero section text and blurred background styling.
3. Confirm the `prodaja`, `izdavanje`, and `događaji` sections render correctly.
4. Confirm mobile layout and nav links work.
5. Confirm there are no console errors.

Decisions
- Implement the site content in Serbian and preserve an elegant real estate theme.
- Use `lang="sr"` and Serbian labels for all visible text.
- Keep the JavaScript minimal and primarily for filtering and form feedback.
