const About = () => {
	return (
		<div
			sx={{
				mx: 3,
				p: {
					fontSize: 2,
				},
			}}
		>
			<h1 sx={{ textAlign: 'center' }}>About</h1>
			<div
				sx={{
					ul: {
						ml: 3,
						li: {
							'&::before': {
								content: '"-"',
								display: 'inline-block',
								width: '1em',
								marginLeft: '-1em',
							},
							a: {
								transition: 'border-color 0.2s ease-in-out',
								borderColor: 'transparent',
								'&:hover': {
									borderBottom: '1px solid',
									borderColor: 'white',
								},
							},
						},
					},
				}}
			>
				<p
					sx={{
						textAlign: 'center',
					}}
				>
					The ntflx project was created to demonstrate my web development skills
				</p>
				<h2>Technologies</h2>
				<div
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					}}
				>
					<div>
						<h3>DevOps</h3>
						<ul>
							<li>
								<a href="https://ubuntu.com/">Ubuntu</a>
							</li>
							<li>
								<a href="https://www.docker.com/">Docker/Compose</a>
							</li>
							<li>
								<a href="https://www.nginx.com/">Nginx</a>
							</li>
						</ul>
					</div>
					<div>
						<h3>Git</h3>
						<ul>
							<li>
								<a href="https://git-scm.com/">Git/Flow</a>
							</li>
							<li>
								<a href="https://github.com/">Github</a>
							</li>
							<li>
								<a href="https://github.com/features/actions">GitHub Actions</a>
							</li>
							<li>
								<a href="https://github.com/typicode/husky">Husky</a>
							</li>
						</ul>
					</div>
					<div>
						<h3>Linters</h3>
						<ul>
							<li>
								<a href="https://eslint.org/">ESLint</a>
							</li>
							<li>
								<a href="https://prettier.io/">Prettier</a>
							</li>
						</ul>
					</div>
					<div>
						<h3>Backend</h3>
						<ul>
							<li>
								<a href="https://nestjs.com/">NestJS</a>
							</li>
							<li>
								<a href="https://typeorm.io/">TypeORM</a>
							</li>
							<li>
								<a href="https://www.postgresql.org/">PostgreSQL</a>
							</li>
							<li>
								<a href="https://jwt.io/">JSON Web Token (JWT)</a>
							</li>
						</ul>
					</div>
					<div>
						<h3>Frontend</h3>
						<ul>
							<li>
								<a href="https://nextjs.org/">NextJS</a>
							</li>
							<li>
								<a href="https://reactjs.org/">ReactJS</a>
							</li>
							<li>
								<a href="https://www.typescriptlang.org/">TypeScript</a>
							</li>
							<li>
								<a href="https://theme-ui.com/">Theme-UI</a>
							</li>
							<li>
								<a href="https://redux-toolkit.js.org/">Redux Toolkit</a>
							</li>
							<li>
								<a href="https://react-hook-form.com/">React Hook Form</a>
							</li>
							<li>
								<a href="https://react-query.tanstack.com/">React Query</a>
							</li>
						</ul>
					</div>
				</div>
				<h2>In conclusion</h2>
				<p>
					I&apos;m not entirely happy with the result of the work I did, because
					I poorly demonstrated partitioning into components in cases where I
					clearly could have done so. Also because of the poorly thought out
					architecture in some moments, and in some not thought out at all. The
					main result of the work I think is that I gained exactly the practical
					knowledge by solving problems, mistakes, and using a lot of modern
					technology. Also, because of the great desire to get a job as soon as
					possible in the project were missed such things as testing and
					adaptability.
				</p>
			</div>
		</div>
	)
}
export default About
