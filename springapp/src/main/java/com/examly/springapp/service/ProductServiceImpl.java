package com.examly.springapp.service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.DTO.ProductDTO;
import com.examly.springapp.exception.InvalidProductException;
import com.examly.springapp.model.Product; 
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepo productRepo;
    private UserRepo userRepo;

    @Autowired
    public ProductServiceImpl(ProductRepo productRepo, UserRepo userRepo) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    @Override
    public Product addProduct(Product product, MultipartFile imageFile) throws IOException{
        if (product == null) {
            throw new InvalidProductException("Enter valid details.");
        } else {
           String uploadDir = "uploads/";
           String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
           Path path = Paths.get(uploadDir + fileName);
           Files.createDirectories(path.getParent());
           Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
           product.setPhotoImage(fileName);
            return productRepo.save(product);
        }
}

    @Override
    public ProductDTO getProductById(long id) {
        Optional<Product> productOptional = productRepo.findById(id);
        if (productOptional.isPresent()) {
            return ProductDTO.fromEntity(productOptional.get());
        } else {
            throw new EntityNotFoundException("Product not found for ID " + id);
        }
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> productList = productRepo.findAll();
        if (productList.isEmpty()) {
            throw new EntityNotFoundException("No products found");
        }
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (Product product : productList) {
            productDTOs.add(ProductDTO.fromEntity(product));
        }
        return productDTOs;
    }

    @Override
    public void deleteProduct(long id) {
        if (productRepo.existsById(id)) {
            productRepo.deleteById(id);
            
        } else {
            throw new EntityNotFoundException("Product with ID " + id + " not found");
        }
    }

    @Override
    public List<ProductDTO> getProductsByUserId(long userId) {
        if (userRepo.existsById(userId)) {
            List<Product> userProducts = productRepo.findByUser(userId);
            if (userProducts.isEmpty()) {
                throw new EntityNotFoundException("No products found for User ID " + userId);
            }
            List<ProductDTO> productDTOs = new ArrayList<>();
            for (Product product : userProducts) {
                productDTOs.add(ProductDTO.fromEntity(product));
            }
            return productDTOs;
        } else {
            throw new EntityNotFoundException("User with ID " + userId + " not found");
        }
    }

    @Override
    public List<ProductDTO> getProductsByCategory(String category) {
        List<Product> categoryProducts = productRepo.findByCategory(category);
        if (categoryProducts.isEmpty()) {
            throw new EntityNotFoundException("No products found in category: " + category);
        }
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (Product product : categoryProducts) {
            productDTOs.add(ProductDTO.fromEntity(product));
        } 
        return productDTOs;

    }

    @Override
    public Product updateProduct(long productId, Product product,MultipartFile imageFile) throws IOException{
        if (product == null) {
            throw new InvalidProductException("Enter valid details.");
        } else {
           String uploadDir = "uploads/";
           String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
           Path path = Paths.get(uploadDir + fileName);
           Files.createDirectories(path.getParent());
           Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
           product.setPhotoImage(fileName);
           return productRepo.save(product);
        }
    }

    @Override
    public Product updateStock(long productId, Product product) {
        if(product == null){
            throw new InvalidProductException("No Product Found");
        }
        else{
            if(productRepo.existsById(productId)){
                return productRepo.save(product);
            }
            else{
                throw new EntityNotFoundException("Product does not exist");
            }
        }
    }



}