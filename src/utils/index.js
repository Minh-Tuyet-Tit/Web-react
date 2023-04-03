
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';
import { db, storage } from '../firebase/config';

export const getCatrgory = async () => {
    let data = [];
    try {
        const categorySnapshot = await getDocs(collection(db, 'categories'));
        data = categorySnapshot.docs.map((doc) => {
            const cate = { ...doc.data(), id: doc.id };
            return cate;
        });
    } catch (error) {
        return false;
    }
    if (data.length > 0) return data;

    return false;
};

export const addMainCategory = async(name) =>{
    try {
       const resul =  await addDoc(collection(db, 'categories'), {
            name
        });

        return resul.id;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const removeSubCategory = async (category, id) => {
    const newSubCate = category?.subcategories?.filter(
        (cate, index) => index !== id,
    );
    try {
        const subCateRef = doc(db, 'categories', category.id);
        await updateDoc(subCateRef, {
            subcategories: [...newSubCate],
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const addSubCategory = async (currCate, value) => {
    if (!value || !currCate) return false;
    if (!currCate.subcategories) {
        currCate.subcategories = [];
    }
    currCate?.subcategories?.push(value);
    const newSubCate = [...currCate?.subcategories];
    try {
        const subCateRef = doc(db, 'categories', currCate.id);
        await updateDoc(subCateRef, {
            subcategories: [...newSubCate],
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

//product

export const getProducts = async () => {
    try {
        const categorySnapshot = await getDocs(collection(db, 'products'));
        const data = categorySnapshot.docs.map((doc) => {
            const data = { ...doc.data() };
            const date = new Date(data.createAt.seconds * 1000);

            const product = {
                ...data,
                id: doc.id,
                createAt: date.toLocaleString('en-US'),
            };
            return product;
        });

        return data;
    } catch (error) {
        return false;
    }

};

// lấy sản phẩm theo Id
export const getProductById = async (id) => {
    try {
        const productRef = doc(db, 'products', id);
        const result = await getDoc(productRef);
        if(result.exists()){
            const date = new Date(result.data().createAt.seconds * 1000);
            const product = {
                ...result.data(),
                id: result.id,
                createAt: date.toLocaleString('en-US'),
            }
            return product
        }else return false
        
    } catch (error) {
        return false;
    }
};


// lấy các sản phẩm theo danh mục chính

export const getProductsByMainCate = async (mainId) => {
    try {
        const productsRef = collection(db, 'products');

        const q = query(productsRef, where('idMainCate', '==', mainId));

        const categorySnapshot = await getDocs(q);
        const data = categorySnapshot.docs.map((doc) => {
            const data = { ...doc.data() };
            const date = new Date(data.createAt.seconds * 1000);

            const product = {
                ...data,
                id: doc.id,
                createAt: date.toLocaleString('en-US'),
            };
            return product;
        });

        return data;
    } catch (error) {
        return false;
    }
};

//lấy sản phẩm theo danh mục phụ và danh mục chính

export const getProductsByMainAndSubCate = async (mainId, subId) => {
    try {
        const productsRef = collection(db, 'products');

        const q = query(
            productsRef,
            where('idMainCate', '==', mainId),
            where('idSubCate', '==', subId === 0 ? subId : subId.toString()),
        );

        const categorySnapshot = await getDocs(q);
        const data = categorySnapshot.docs.map((doc) => {
            const data = { ...doc.data() };
            const date = new Date(data.createAt.seconds * 1000);

            const product = {
                ...data,
                id: doc.id,
                createAt: date.toLocaleString('en-US'),
            };
            return product;
        });

        return data;
    } catch (error) {
        return false;
    }
};

// xử lý hình ảnh trong storage
export const imgProcess = async (file) => {
    const storageRef = ref(storage, 'images/' + file.id);
    try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.log('Không tải được ảnh lên ', error);
        return false;
    }
};

export const removeImage = async (id) => {
    const storageRef = ref(storage, 'images/' + id);
    try {
        await deleteObject(storageRef);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// thêm sản phẩm
export const addProduct = async (product) => {
    const newProduct = {
        ...product,
        createAt: serverTimestamp(),
    };
    try {
        await addDoc(collection(db, 'products'), {
            ...newProduct,
        });

        console.log('add ok');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Xóa sản phẩm

export const remveProduct = async (currProduct) => {
    const productRef = doc(db, 'products', currProduct.id);
    try {
        await deleteDoc(productRef);
        for (let i = 0; i < currProduct.listImg.length; i++) {
            await removeImage(currProduct.listImg[i].id);
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

//update sản phẩm

export const updatesProduct = async (product, id) => {
    const newProduct = {
        ...product,
        createAt: serverTimestamp(),
    };
    try {
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, {
            ...newProduct,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
