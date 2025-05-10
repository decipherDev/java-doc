// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Java',
			sidebar: [
				{
					label: 'New Features',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Local variable type inference', slug: 'java-new-features/local-variable-type-inference' },
						{ label: 'Record', slug: 'java-new-features/record' }

					],
				},
				{
					label: 'Stream',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Stream Coding QnA', slug: 'java-stream/java-stream-coding' }
					],
				}
			],
		}),
	],
});
