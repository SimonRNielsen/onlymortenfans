//API
const API = "https://reactapi-6jhi.onrender.com/api/";

//Users Endpoints
const LOGIN_URL = API + "users/login"; //Post --> LoginDTO = UserReturnDTO
const CREATE_USER = API + "users/create"; //Post --> CreateUserDTO = UserReturnDTO
const GET_USERS = API + "users/getUsers"; //Get = List<UserListingDTO>
const CHECK_USERS = API + "users/checknewusers"; //Get = string (Hash-value -> List<UserListingDTO>)
const PROFILE = API + "users/updateprofile";

//Posts Endpoints
const POSTS = API + "posts/posts"; //Get = List<PostDTO>
const COMMENT = API + "posts/addcomment"; //Post --> NewCommentDTO = status + feedback
const OPINION = API + "posts/addopinion"; //Post --> OpinionDTO = status + feedback
const NEW_POST = API + "posts/newpost"; //Post --> CreatePostDTO = status + feedback
const DELETE_POST = API + "posts/deletepost"; //Delete --> DeletePostDTO = status + feedback
const DELETE_COMMENT = API + "posts/deletecomment"; //Delete --> DeleteCommentDTO = status + feedback
const UPDATE = API + "posts/update"; //Get = string (Hash-value -> List<PostDTO>)

async function makePromise(url, dto, isDelete=false) {
    return fetch(url, {
        method: isDelete ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto)
    }); 
}

export async function login(loginDTO) {
    return makePromise(LOGIN_URL, loginDTO)
}

export async function create(createUserDTO) {
    return makePromise(CREATE_USER, createUserDTO);
}

export async function getUsers() {
    return fetch(GET_USERS);
}

export async function checkUsers() {
    return fetch(CHECK_USERS);
}

export async function getPosts() {
    return fetch(POSTS);
}

export async function addComment(newCommentDTO) {
    return makePromise(COMMENT, newCommentDTO);
}

export async function addOpinion(opinionDTO) {
    return makePromise(OPINION, opinionDTO);
}

export async function addNewPost(createPostDTO) {
    return makePromise(NEW_POST, createPostDTO);
}

export async function deletePost(deletePostDTO) {
    return makePromise(DELETE_POST, deletePostDTO, true);
}

export async function deleteComment(deleteCommentDTO) {
    return makePromise(DELETE_COMMENT, deleteCommentDTO, true);
}

export async function updatePosts() {
    return fetch(UPDATE);
}

export async function updateProfile(updateProfileDTO) {
    return makePromise(PROFILE, updateProfileDTO);
}