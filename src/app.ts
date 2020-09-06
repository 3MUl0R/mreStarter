/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk'
import DefaultEnv from './types'



/**
 * define your application here
 */
export default class myApp{

    /**container for major app assets */
	private assets: MRE.AssetContainer
	/**container for major app prefabs */
	private prefabs: { [key: string]: MRE.Prefab } = {}
	/**use to save player info */
	private userMap : Map<MRE.Guid, string> = new Map()

    /**
	 * Constructs a new instance of this class.
	 * @param context The MRE SDK context.
	 * @param params Any url params that were received from the client connection.
	 */
	constructor(private env: DefaultEnv, private context: MRE.Context, private params:MRE.ParameterSet) {
        //initialize an assets container 
		this.assets = new MRE.AssetContainer(context)

		//define actions for context events we're interested in
		this.context.onStarted(() => {
			this.started()
		})
		
		this.context.onUserJoined(user => {
			this.userJoined(user)
		})

		this.context.onUserLeft(user => {
			this.userLeft(user)
		})

		this.context.onStopped(() => {
			this.stopped()
		})
	}


    /**
	 * Called when an application session starts up.
	 */
	private async started(){
		MRE.log.info('app', `App started for session ${this.context.sessionId}`)

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
	private userLeft(user: MRE.User){
		MRE.log.info('app', `User left: ${this.context.sessionId}`)
	}
	
	/**
	 * call when a user joins the application
	 * @param user 
	 */
	private userJoined(user: MRE.User){
		MRE.log.info('app', `User Joined: ${this.context.sessionId}`)

		//if the user is a moderator add them to the group mask
		//this allows them to see all controls for that group
		if (user.properties['altspacevr-roles'].includes('moderator')){ 
			user.groups.set(['moderator'])
		}
	}

	/**
	 * call when stopping the application
	 */
	private stopped(){
		MRE.log.info('app', `Stopping session ${this.context.sessionId}`)
		//perform cleanup here, such as shutting down any sub processes
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