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
import * as Yup from 'yup'

const yup = (node) => {
	try {
		switch (node.validate.returnType) {
			case 'string':
				return node.validate.required
					? Yup.string()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
							.matches(node.validate.matches || /[\s\S]*/, 'Not match!')
							.required()
					: Yup.string()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
							.matches(node.validate.matches || /[\s\S]*/, 'Not match!')
			case 'number':
				return node.validate.required
					? Yup.number()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
							.required()
					: Yup.string()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
			case 'bool':
				return node.validate.required ? Yup.bool().required() : Yup.bool()
			case 'array':
				return node.validate.required
					? Yup.array()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
							.required()
					: Yup.array()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
			case 'date':
				return node.validate.required ? Yup.date().required() : Yup.date()
			case 'object':
				return node.validate.required ? Yup.object().required() : Yup.object()
			default:
				return
		}
	} catch (error) {}
}

export const Form = ({ nodes, validate }) => {
	let initialValues = {}
	let shape = {}
	for (const node of nodes) {
		if (node.childrenType === 'checkbox') {
			initialValues[node.key] = []
		} else {
			if (node.type === 'slider') {
				initialValues[node.key] = 0
			} else {
				initialValues[node.key] = ''
			}
		}
		shape[node.key] = yup(node)
	}
	const formSchema = Yup.object().shape(shape)
	const formik = useFormik({
		initialValues,
		validationSchema: formSchema,
		onSubmit: (values) => {
			console.log(Date(), values)
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
												<FormGroup name={node.key}>
													{node.children.map((child) => (
														<FormControlLabel
															name={child.key}
															control={
																<Checkbox
																	onClick={() => {
																		const index = formik.initialValues[`${node.key}`].findIndex(
																			(result) => result === child.key
																		)
																		if (index === -1) {
																			formik.initialValues[`${node.key}`].push(child.key)
																		} else {
																			formik.initialValues[`${node.key}`].splice(index, 1)
																		}
																	}}
																/>
															}
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
										value={parseInt(formik.values[`${node.key}`])}
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
											name={node.key}
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
