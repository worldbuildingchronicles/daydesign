//
//  ListRest1Two
//  dynamic
//
//  Created by dhvani&dhrumil.
//  Copyright © 2018 magic. All rights reserved.
//

import { Text, StyleSheet, View } from "react-native"
import React from "react"


export default class ListRest1Two extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				style={styles.listRest1}>
				<View
					style={styles.group3View}>
					<View
						style={{
							flexDirection: "row",
						}}>
						<Text
							style={styles.jawadSStyleChickText}>Jawad's Style: Chicken Shawarma Wrap</Text>
						<Text
							style={styles.textText}>$11.00</Text>
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
						}}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Text
								style={styles.servingsText}>3 Servings</Text>
							<View
								style={styles.groupView}>
								<Text
									style={styles.textTwoText}>+23</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	listRest1: {
		backgroundColor: "white",
		height: 66,
	},
	group3View: {
		backgroundColor: "transparent",
		marginLeft: 3,
		marginRight: 6,
		height: 66,
	},
	jawadSStyleChickText: {
		color: "rgb(55, 58, 61)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 6,
		flex: 1,
	},
	textText: {
		color: "rgb(55, 58, 61)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 23,
		marginTop: 6,
		flex: 1,
	},
	servingsText: {
		color: "rgb(55, 58, 61)",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginBottom: 10,
	},
	groupView: {
		backgroundColor: "transparent",
		borderRadius: 11,
		borderWidth: 1,
		borderColor: "rgb(226, 175, 47)",
		borderStyle: "solid",
		marginLeft: 16,
		marginBottom: 8,
		width: 39,
		height: 22,
		justifyContent: "center",
	},
	textTwoText: {
		color: "rgb(226, 175, 47)",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		width: 39,
		height: 14,
	},
})
