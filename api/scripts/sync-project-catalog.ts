/**
 * Regenerates src/constants/student-projects.json from the web catalog so the API
 * prices student projects by id alone. Run after editing web/src/components/student-projects/data.ts:
 *   npm run catalog:sync
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { STUDENT_PROJECTS } from '../../web/src/components/student-projects/data.ts';

const outputPath = fileURLToPath(new URL('../src/constants/student-projects.json', import.meta.url));

const catalog = Object.fromEntries(
  STUDENT_PROJECTS.map((project) => [project.id, { code: project.code, title: project.title, tier: project.tier }])
);

writeFileSync(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.info(`Wrote ${STUDENT_PROJECTS.length} projects to ${outputPath}`);
