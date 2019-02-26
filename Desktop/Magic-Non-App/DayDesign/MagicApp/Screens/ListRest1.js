//
//  ListRest1
//  dynamic
//
//  Created by dhvani&dhrumil.
//  Copyright © 2018 magic. All rights reserved.
//

import { Text, StyleSheet, View } from "react-native"
import React from "react"


export default class ListRest1 extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				style={styles.listRest1}>
				<View
					style={{
						flexDirection: "row",
					}}>
					<View
						style={styles.group3View}>
						<Text
							style={styles.jawadSStyleChickText}>Jawad's Style: Chicken Shawarma Wrap</Text>
						<Text
							style={styles.pitaBreadStuffedWText}>pita bread stuffed with chicken & fries, pickles, garlic mayo & hot sauce</Text>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "flex-end",
						}}>
						<View
							style={styles.group2View}>
							<Text
								style={styles.textTwoText}>$12.00</Text>
							<View
								style={{
									flex: 1,
									justifyContent: "flex-end",
								}}>
								<Text
									style={styles.textText}>$11.00</Text>
							</View>
						</View>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
					}}>
					<View
						style={styles.groupView}>
						<Text
							style={styles.textThreeText}>+23</Text>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	listRest1: {
		backgroundColor: "white",
		height: 101,
	},
	group3View: {
		backgroundColor: "transparent",
		marginLeft: 3,
		marginTop: 6,
		width: 309,
		height: 57,
	},
	jawadSStyleChickText: {
		color: "rgb(55, 58, 61)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 309,
	},
	pitaBreadStuffedWText: {
		color: "rgb(97, 102, 106)",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 17,
		backgroundColor: "transparent",
		marginTop: 1,
		width: 309,
	},
	group2View: {
		backgroundColor: "transparent",
		marginRight: 4,
		marginTop: 7,
		width: 51,
		height: 49,
	},
	textTwoText: {
		color: "rgba(55, 58, 61, 0.26)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textText: {
		color: "rgb(55, 58, 61)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	groupView: {
		backgroundColor: "transparent",
		borderRadius: 11,
		borderWidth: 1,
		borderColor: "rgb(226, 175, 47)",
		borderStyle: "solid",
		marginLeft: 4,
		marginBottom: 10,
		width: 39,
		height: 22,
		justifyContent: "center",
	},
	textThreeText: {
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
