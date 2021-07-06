let myPermissionsService = {
    enablePermissionsInlineCallbacks,
    enablePermissionsWithPromises,
    enablePermissionsAsync,
    logPermissionResult
};

let myDb = {
    connectToDbAsync,
    connectToDbWithCallback,
};

let that = myPermissionsService;

// Sync inline callbacks
function enablePermissionsInlineCallbacks(userId, permissionType) {
    myDb.connectToDbWithCallback((db) => {
        db.getUserWithCallback(userId, (user) => {
            db.getPermissionsWithCallback(permissionType, (permissions) => {
                let result = permissions.enableAccess(user);
                // that.logPermissionResult(result);
                this.logPermissionResult(result);
            })
        })
    });
}

async function enablePermissionsWithPromises(userId, permissionType) {
    return myDb.connectToDbAsync()
        .then(db => db.getUserAsync(userId)
            .then(user => ({ db, user })))
        .then(({ db, user }) => db.getPermissionsAsync(permissionType)
            .then(permissions => ({ user, permissions })))
        .then(({ user, permissions }) => {
            let result = permissions.enableAccess(user);
            this.logPermissionResult(result);
        });
}

async function enablePermissionsAsync(userId, permissionType) {
    let db = await connectToDbAsync();
    let user = await db.getUserAsync(userId);
    let permissions = await getPermissionsAsync(permissionType);
    let result = permissions.enableAccess(user);
    this.logPermissionResult(result);
}

(async () => {
    // myPermissionsService.enablePermissionsInlineCallbacks(123, 'write');
    // myPermissionsService.enablePermissionsWithPromises(123, 'write')
    // .then(d => console.log('done'));
    // await myPermissionsService.enablePermissionsAsync(123, 'write');
    // console.log('done');
})();


//functions implementations
function logPermissionResult(entry) {
    console.log('added entry ' + entry);
}

function enableAccess(user) {
    return 'enableAccess result';
}

//Sync with callback
function connectToDbWithCallback(callback) {
    let db = { name: 'pesho', getUserWithCallback, getPermissionsWithCallback };
    setTimeout(() => {
        callback(db);
    }, 50);

}

function getUserWithCallback(userId, callback) {
    //get user by id
    let user = { user: 'gosho' };
    setTimeout(() => {
        callback(user);
    }, 50);

}

function getPermissionsWithCallback(permissionType, callback) {
    //get permissions by type
    let permissions = { enableAccess };
    setTimeout(() => {
        callback(permissions);
    }, 50);
}

//Async
function connectToDbAsync() {
    return new Promise((resolve, reject) => resolve({ name: 'pesho', getUserAsync, getPermissionsAsync }));
}

function getUserAsync(userId) {
    //get user by Id
    return new Promise((resolve, reject) => resolve({ user: 'gosho' }));
}

function getPermissionsAsync(permissionType) {
    //get permissions by type
    return new Promise((resolve, reject) => resolve({ enableAccess }));
}
