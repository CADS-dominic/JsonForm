import {
	Button,
	FormControl,
	Grid,
	TextField,
	FormLabel,
	Radio,
	RadioGroup,
	FormControlLabel,
	Container,
	Slider,
	InputLabel,
	Select,
	MenuItem,
	FormGroup,
	Checkbox,
} from '@mui/material'
import { useFormik } from 'formik'

export const Form = ({ nodes, validate }) => {
	let initialValues = {}
	for (const element of nodes) {
		if (element.type !== 'group' && element.type !== 'button') {
			initialValues[element.key] = ''
		}
	}
	const formik = useFormik({
		initialValues,
		validate,
		onSubmit: (values) => {
			console.log(values)
		},
	})
	return (
		<Container maxWidth='md'>
			<form onSubmit={formik.handleSubmit}>
				<Grid container>
					{nodes.map((node) => {
						switch (node.type) {
							case 'button':
								return (
									<Grid item sm={node.ui.width || 12}>
										<Button
											sx={{ m: node.ui.margin, p: node.ui.padding }}
											id={node.key}
											type={node.click || 'button'}
											variant='contained'
											fullWidth={true}
										>
											{node.label || node.key}
										</Button>
									</Grid>
								)
							case 'group':
								return node.childrenType === 'select' ? (
									<Grid item sm={node.ui.width || 12}>
										<FormControl fullWidth sx={{ m: node.ui.margin, p: node.ui.padding }}>
											<InputLabel>{node.label || node.key}</InputLabel>
											<Select
												id={node.key}
												name={node.key}
												value={formik.values[`${node.key}`] || ''}
												label={node.label || node.key}
												onChange={formik.handleChange}
											>
												{node.children.map((child) => (
													<MenuItem value={child.key}>{child.label || child.key}</MenuItem>
												))}
											</Select>
										</FormControl>
										{formik.errors[`${node.key}`] ? <div>{formik.errors[`${node.key}`]}</div> : null}
									</Grid>
								) : (
									<Grid item sm={node.ui.width || 12}>
										<FormControl id={node.key} sx={{ m: node.ui.margin, p: node.ui.padding }}>
											<FormLabel>{node.label || node.key}</FormLabel>
											{node.childrenType === 'radio' ? (
												<RadioGroup name={node.key} onChange={formik.handleChange}>
													{node.children.map((child) => {
														return (
															<FormControlLabel
																value={child.key}
																control={<Radio />}
																label={child.label || child.key}
															/>
														)
													})}
												</RadioGroup>
											) : (
												<FormGroup name={node.key} onChange={formik.handleChange}>
													{node.children.map((child) => (
														<FormControlLabel
															name={child.key}
															control={<Checkbox />}
															label={child.label || child.key}
														/>
													))}
												</FormGroup>
											)}
										</FormControl>
										{formik.errors[`${node.key}`] ? <div>{formik.errors[`${node.key}`]}</div> : null}
									</Grid>
								)
							case 'slider':
								return (
									<Slider
										id={node.key}
										name={node.key}
										aria-label='Volume'
										value={formik.values[`${node.key}`]}
										onChange={formik.handleChange}
										sx={{ m: node.ui.margin, p: node.ui.padding }}
									/>
								)
							case 'date':
								return (
									<Grid item sm={node.ui.width || 12}>
										<TextField
											id={node.key}
											label={node.label || node.key}
											fullWidth={true}
											onChange={formik.handleChange}
											value={formik.values[`${node.key}`]}
											type={node.type}
											variant={node.ui.variant}
											InputLabelProps={{
												shrink: true,
											}}
											sx={{ m: node.ui.margin, p: node.ui.padding }}
										/>
										{formik.errors[`${node.key}`] ? <div>{formik.errors[`${node.key}`]}</div> : null}
									</Grid>
								)
							default:
								return (
									<Grid item sm={node.ui.width || 12}>
										<TextField
											id={node.key}
											label={node.label || node.key}
											fullWidth={true}
											onChange={formik.handleChange}
											value={formik.values[`${node.key}`]}
											type={node.type}
											variant={node.ui.variant}
											sx={{ m: node.ui.margin, p: node.ui.padding }}
										/>
										{formik.errors[`${node.key}`] ? <div>{formik.errors[`${node.key}`]}</div> : null}
									</Grid>
								)
						}
					})}
				</Grid>
			</form>
		</Container>
	)
}
