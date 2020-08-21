/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk'



/**
 * define your application here
 */
export default class myApp{

    // Container for preloaded object prefabs.
	private assets: MRE.AssetContainer
	private prefabs: { [key: string]: MRE.Prefab } = {}

    /**
	 * Constructs a new instance of this class.
	 * @param context The MRE SDK context.
	 * @param baseUrl The baseUrl to this project's `./public` folder.
	 */
	constructor(private context: MRE.Context, private baseUrl: string) {
        //initialize an assets container 
		this.assets = new MRE.AssetContainer(context)
		// Hook the context events we're interested in.
		this.context.onStarted(() => this.started())
		this.context.onUserLeft(user => this.userLeft(user))
	}


    /**
	 * Called when an application session starts up.
	 */
	private async started(){
        // Check whether code is running in a debuggable watched filesystem
		// environment and if so delay starting the app by 1 second to give
		// the debugger time to detect that the server has restarted and reconnect.
		// The delay value below is in milliseconds so 1000 is a one second delay.
		// You may need to increase the delay or be able to decrease it depending
		// on the speed of your PC.
		const delay = 1000
		const argv = process.execArgv.join()
		const isDebug = argv.includes('inspect') || argv.includes('debug')

		// version to use with async code
		if (isDebug) {
			await new Promise(resolve => setTimeout(resolve, delay))
			await this.startedImpl()
		} else {
			await this.startedImpl()
		}
    }


    // use () => {} syntax here to get proper scope binding when called via setTimeout()
	// if async is required, next line becomes private startedImpl = async () => {
	private startedImpl = async () => {
		
        //do startup work here such as preloading objects or showing a menu
        this.showHello()
    }
    

    /**
	 * Called when a user leaves the application 
	 * @param user The user that bailed
	 */
	private userLeft(user: MRE.User) {

    }
    

    /**
	 * Display a friendly greeting
	 */
	private showHello() {
		// Create a parent object for all items you whish to display
		const menu = MRE.Actor.Create(this.context, {})

		//create the label
		MRE.Actor.Create(this.context, {
			actor: {
				parentId: menu.id,
				name: 'label',
				text: {
					contents: ''.padStart(8, ' ') + "HelloFriend",
					height: 0.8,
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: MRE.Color3.Yellow()
				},
				transform: {
					local: { position: { x: 0.5, y: 0.55, z: 0 } }
				}
			}
		})
	}

}