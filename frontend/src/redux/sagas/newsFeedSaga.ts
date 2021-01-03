import { call, put } from "redux-saga/effects";
import { CREATE_POST_START, GET_FEED_START } from "~/constants/actionType";
import { createPost, getNewsFeed } from "~/services/api";
import { createPostSuccess, getNewsFeedSuccess } from "../action/feedActions";
import { isCreatingPost } from "../action/loadingActions";

interface INewsFeedSaga {
    type: string;
    payload: any;
}

function* newsFeedSaga({ type, payload }: INewsFeedSaga) {
    switch (type) {
        case GET_FEED_START:
            try {
                const posts = yield call(getNewsFeed, payload);
                yield put(getNewsFeedSuccess(posts));
            } catch (e) {
                console.log(e);
            }

            break;
        case CREATE_POST_START:
            try {
                yield put(isCreatingPost(true));

                const post = yield call(createPost, payload);

                yield put(createPostSuccess(post));
                yield put(isCreatingPost(false));
            } catch (e) {
                console.log(e);
            }
            break;
        default:
            throw new Error('Unexpected action type.')
    }
}

export default newsFeedSaga;