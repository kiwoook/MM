package com.example.jpa_study;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;


public class JpaStudyApplication {

    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
        EntityManager em = emf.createEntityManager();

        EntityTransaction tx  = em.getTransaction();
        tx.begin();

        try{


            tx.commit();
        }catch (Exception e){
            // 오류 발생시 트랜잭션 롤백
            tx.rollback();
        }finally {
            em.close();
        }
        emf.close();

    }


}
