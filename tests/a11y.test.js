/**
 * @jest-environment jsdom
 */

const { toHaveNoViolations } = require('jest-axe');
const { axe } = require('jest-axe');
const fs = require('fs');
const path = require('path');

expect.extend(toHaveNoViolations);

describe('Accessibility Audit', () => {
  it('should have no axe-core accessibility violations in index.html', async () => {
    // Read the static HTML file
    const htmlPath = path.resolve(__dirname, '../public/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Load it into jsdom
    document.documentElement.innerHTML = htmlContent;

    // Run axe on the document
    const results = await axe(document.documentElement);

    // Assert there are no violations
    expect(results).toHaveNoViolations();
  });
});
