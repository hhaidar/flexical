//
// Board Widgets (Frontend)
//

board.widgets = {
    'weather': {
        job: 'weather',
        update: function(data, job) {
            console.log('updated weather')
        }
    },
    'servers': {
        job: 'servers',
        update: function(data, job) {
            console.log('updated servers')
        }
    },
    'transit': {
        job: 'transit',
        update: function(data, job) {
            console.log('updatedtransit')
        }
    },
    'iteration': {
        job: 'iteration',
        update: function(data, job) {
            console.log('updated iteration')
        }
    },
}

board.start();